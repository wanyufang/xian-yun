// vuex

// 1 state 代表你需要存储的数据
// 2 mutations 同步修改state的数据
// 3 actions 异步修改mutations中的数据


// 必须要export const state来获取数据
export const state = () => {
    return {
        userInfo: {
            token: '',
            user: {}
        }
    }
}

export const mutations = {
    // 保存用户数据到state
    setUserInfo(state, data) {
        state.userInfo = data
    },
    // 清除用户数据
    cleanUserInfo(state, info) {
        if (process.browser) {
            localStorage.removeItem("userInfo")
        }
        state.userInfo = {}
    }
}

export const actions = {
    // 登录
    login({ commit }, data) {
        return this.$axios({
            url: '/accounts/login',
            method: 'POST',
            data: data
        }).then((res) => {
            const data = res.data
            // 保存到state
            commit('setUserInfo', data)
            return data
        })
    }
}