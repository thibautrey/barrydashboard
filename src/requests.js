import axios from "axios";
import {
  format,
  endOfMonth,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  subMonths,
  subWeeks,
  addDays,
} from "date-fns";
import { first, get } from "lodash";
import { isKindle } from "./utils";

const token =
  localStorage.getItem("token") ||
  (isKindle &&
    "P2lvlPB8oQCSZql60sAwH2Ntdu1GV7qp80jxZkvjiB4McxRNBvy2J0Lj643KYWuoOvY9XRtg6CgX8yA/eiDblLi1oPmheO+kDXejf1fdAYt8BQVFtB5iZIiis/UCpbMm8SJC/TdIYhsE+tRnvMMKHmc4HW6SH7VDoMBNxweRJvc=");

const barryRootApi = "https://jsonrpc.barry.energy/json-rpc#";

const getDateTimeFrames = (daySubstract) => [
  `${format(addDays(new Date(), daySubstract), "yyyy-MM-dd")}T00:00:00Z`,
  `${format(addDays(new Date(), daySubstract), "yyyy-MM-dd")}T23:59:59Z`,
];

const getCurrentMonthTimeFrames = () => [
  `${format(startOfMonth(new Date()), "yyyy-MM-dd")}T00:00:00Z`,
  `${format(endOfMonth(new Date()), "yyyy-MM-dd")}T23:59:59Z`,
];

const getCurrentWeekTimeFrames = () => [
  `${format(startOfWeek(new Date()), "yyyy-MM-dd")}T00:00:00Z`,
  `${format(endOfWeek(new Date()), "yyyy-MM-dd")}T23:59:59Z`,
];

const getLastMonthTimeFrames = () => [
  `${format(startOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd")}T00:00:00Z`,
  `${format(endOfMonth(subMonths(new Date(), 1)), "yyyy-MM-dd")}T23:59:59Z`,
];

const getLastWeekTimeFrames = () => [
  `${format(startOfWeek(subWeeks(new Date(), 1)), "yyyy-MM-dd")}T00:00:00Z`,
  `${format(endOfWeek(subWeeks(new Date(), 1)), "yyyy-MM-dd")}T23:59:59Z`,
];

const barryRequest = ({ url, method, data }) =>
  axios({
    url,
    method,
    timeout: 60 * 1000 * 1000,
    maxRedirects: 100,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: 0,
      jsonrpc: "2.0",
      ...data,
    },
  }).then(({ data: { result, error } }) => {
    if (error && error.code === -32000) {
      return new Promise((resolve) => {
        window.setTimeout(() => {
          resolve(barryRequest({ url, method, data }));
        }, 5000);
      });
    } else {
      return result;
    }
  });

const getTicks = ({ daySubstract }) =>
  barryRequest({
    url: `${barryRootApi}#Get Spotprice`,
    method: "POST",
    data: {
      params: ["FR_EPEX_SPOT_FR", ...getDateTimeFrames(daySubstract)],
      method: "co.getbarry.api.v1.OpenApiController.getPrice",
    },
  });

const getMeteringPoint = () =>
  barryRequest({
    url: `${barryRootApi}#Get MeteringPoints`,
    method: "POST",
    data: {
      params: [],
      method: "co.getbarry.api.v1.OpenApiController.getMeteringPoints",
    },
  }).then((data) => get(first(data), "address"));

const getAggregatedDataCurrentMonth = () =>
  barryRequest({
    url: `${barryRootApi}#Get Aggeregated Consumption`,
    method: "POST",
    data: {
      params: [...getCurrentMonthTimeFrames()],
      method: "co.getbarry.api.v1.OpenApiController.getAggregatedConsumption",
    },
  });

const getAggregatedDataCurrentWeek = () =>
  barryRequest({
    url: `${barryRootApi}#Get Aggeregated Consumption`,
    method: "POST",
    data: {
      params: [...getCurrentWeekTimeFrames()],
      method: "co.getbarry.api.v1.OpenApiController.getAggregatedConsumption",
    },
  });

const getAggregatedDataLastMonth = () =>
  barryRequest({
    url: `${barryRootApi}#Get Aggeregated Consumption`,
    method: "POST",
    data: {
      params: [...getLastMonthTimeFrames()],
      method: "co.getbarry.api.v1.OpenApiController.getAggregatedConsumption",
    },
  });

const getAggregatedDataLastWeek = () =>
  barryRequest({
    url: `${barryRootApi}#Get Aggeregated Consumption`,
    method: "POST",
    data: {
      params: [...getLastWeekTimeFrames()],
      method: "co.getbarry.api.v1.OpenApiController.getAggregatedConsumption",
    },
  });

export {
  getTicks,
  getMeteringPoint,
  getAggregatedDataCurrentMonth,
  getAggregatedDataCurrentWeek,
  getAggregatedDataLastMonth,
  getAggregatedDataLastWeek,
};
