/*
包含n个接口请求函数的模块
 */
import ajax from "@/api/ajax";
const BASE_URL = '/api'
export const reqGetUser = (q) => ajax(BASE_URL+'/search/users',{q})


/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/goods')