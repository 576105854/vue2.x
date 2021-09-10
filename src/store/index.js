/*
vuex最核心的管理对象store
 */
import Vue from "vue";
import Vuex from "vuex";
import {reqGetUser, reqShopGoods, reqShopRatings, reqShopInfo} from "@/api";

const addressOptions = {
    namespaced:true,
    //准备actions--用于响应组件中的动作
    actions:{
        async getUser(context,value){
            console.log('async',value)
            const res = await reqGetUser(value)
            context.commit('user_name',res.items[0])
        },
        getAddress(context){
            const address={
                address:'青岛市市北区纺织谷',
                city: '青岛市',
                geohash: '31.228221,121.361674',
                latitude: 31.228221,
                longitude: 121.361674,
                name:'青岛市市北区纺织谷A座'
            }
            context.commit('receive_address',address)
        },
        getCategorys(context){
            const categorys = [
                {
                    name:'甜品饮品',
                    img:require('@/common/images/nav/1.jpg')
                },
                {
                    name:'商超便利',
                    img:require('@/common/images/nav/2.jpg')
                },
                {
                    name:'美食',
                    img:require('@/common/images/nav/3.jpg')
                },
                {
                    name:'简餐',
                    img:require('@/common/images/nav/4.jpg')
                },
                {
                    name:'新店特惠',
                    img:require('@/common/images/nav/5.jpg')
                },
                {
                    name:'准时达',
                    img:require('@/common/images/nav/6.jpg')
                },
                {
                    name:'预订早餐',
                    img:require('@/common/images/nav/7.jpg')
                },
                {
                    name:'土豪推荐',
                    img:require('@/common/images/nav/8.jpg')
                },
                {
                    name:'甜品饮品',
                    img:require('@/common/images/nav/9.jpg')
                },
                {
                    name:'甜品饮品',
                    img:require('@/common/images/nav/10.jpg')
                },
                {
                    name:'甜品饮品',
                    img:require('@/common/images/nav/11.jpg')
                },
                {
                    name:'甜品饮品',
                    img:require('@/common/images/nav/12.jpg')
                }
            ]
            context.commit('receive_categorys',categorys)
        },
        getShops(context){
            const shops= [
                {
                    name: '嘉禾一品',
                    image_path: require('@/common/images/shop/1.jpg'),
                    supports: [
                        {
                            id: 1,
                            icon_name: '稳'
                        },
                        {
                            id: 2,
                            icon_name: '准'
                        },
                        {
                            id: 3,
                            icon_name: '狠'
                        }
                    ],
                    rating: 4.7,
                    recent_order_num: 106,
                    delivery_mode: '中软专送',
                    float_minimum_order_amount: 20,
                    float_delivery_free: 5
                },
                {
                    name: '海底捞',
                    image_path: require('@/common/images/shop/2.jpg'),
                    supports: [
                        {
                            id: 1,
                            icon_name: '稳'
                        },
                        {
                            id: 2,
                            icon_name: '准'
                        },

                    ],
                    rating: 5.0,
                    recent_order_num: 52,
                    delivery_mode: '中软专送',
                    float_minimum_order_amount: 120,
                    float_delivery_free: 0
                },
                {
                    name: '肯德基',
                    image_path: require('@/common/images/shop/3.jpg'),
                    supports: [
                        {
                            id: 1,
                            icon_name: '稳'
                        }

                    ],
                    rating: 4.5,
                    recent_order_num: 78,
                    delivery_mode: '宅急送',
                    float_minimum_order_amount: 60,
                    float_delivery_free: 15
                },{
                    name: '爱吃不吃',
                    image_path: require('@/common/images/shop/4.jpg'),
                    supports: [
                        {
                            id: 1,
                            icon_name: '稳'
                        },
                        {
                            id: 2,
                            icon_name: '准'
                        },

                    ],
                    rating: 0.5,
                    recent_order_num: 2,
                    delivery_mode: '中软专送',
                    float_minimum_order_amount: 180,
                    float_delivery_free: 50
                }
            ]
            context.commit('receive_shops',shops)
        }
    },
    //mutations--用于操作数据（state）
    mutations:{
        user_name(state,value){
            state.userInfo = value
        },
        receive_address (state, address){
            state.address = address
        },
        receive_shops (state, shops){
            state.shops = shops
        },
        receive_categorys (state, categorys){
            state.categorys = categorys
        },
    },
    //state--用于存储数据
    state:{
        userInfo: {},
        latitude: 31.228221, //纬度
        longitude: 121.361674, //经度
        address: {}, //地址相关信息对象
        categorys: [], //食品分类数组
        shops: [], //商家数组
    },
    //getters -- 用户将state中的数据进行加工
    getters:{}
}

const detailsOptions = {
    namespaced:true,
    //准备actions--用于响应组件中的动作
    actions:{
        async getShopInfo(context){
            const res = await reqShopInfo()
            context.commit('receive_info',res.data)
        },
        async getShopRatings(context){
            const res = await reqShopRatings()
            context.commit('receive_ratings',res.data)
        },
        async getShopGoods(context, callback){
            const res = await reqShopGoods()
            context.commit('receive_goods',res.data)
            callback && callback();
        },

        updateFoodCount (context, value){
            context.commit('food_count',value)
        },
        clearCart (context){
            context.commit('clear_cart')
        }
    },
    //mutations--用于操作数据（state）
    mutations:{
        receive_goods (state, goods) {
            state.goods = goods
        },
        receive_ratings (state, ratings) {
            state.ratings = ratings
        },
        receive_info (state, info) {
            state.info = info
        },
        food_count (state, value){
            if(value.isAdd){
                if(!value.food.count){
                   // value.food.count = 1 //新增属性（没有数据绑定）
                    Vue.set(value.food,'count',1) //让新增的数据也有数据绑定
                    state.cartFoods.push(value.food)
                }else{
                    value.food.count++
                }
            }else{
                if(value.food.count) //只有有值才减
                value.food.count--
                if(value.food.count === 0)
                    state.cartFoods.splice(state.cartFoods.indexOf(value.food),1)
            }
        },
        clear_cart (state){
            //清除food中的count
            state.cartFoods.forEach(food => food.count = 0)
            //移除购物车中的所有购物项
            state.cartFoods = []
        }
    },
    //state--用于存储数据
    state:{
        goods:[], //商品列表
        ratings:[], //商家评价列表
        info:{}, //商家信息
        cartFoods:[]
    },
    //getters -- 用户将state中的数据进行加工
    getters:{
        totalCount (state) {
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count , 0)
        },
        totalPrice (state){
            return state.cartFoods.reduce((preTotal, food) => preTotal + food.count * food.price , 0)
        },
        positiveSize (state){
            return null
        }
    }
}
Vue.use(Vuex)
//创建并暴露store
export default new Vuex.Store({
    modules:{
        addressAbout:addressOptions,
        detailsAbout:detailsOptions
    }
})


