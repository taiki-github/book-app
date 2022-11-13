import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

export const state = () => ({
    isLoggedIn: false,
    userUid: '',
    email: ''
})

export const mutations = {
    setLoginState(state, loggedIn) {
        state.isLoggedIn = loggedIn
    },
}

export const actions = {
    async login({ commit }, payload) {
        try {
            // vuexの引数には注意する
            const auth = getAuth(this.$firebase)
            await signInWithEmailAndPassword(auth, payload.email, payload.password)
            commit('setLoginState', true)
            this.$router.push('/book')
        } catch (e) {
            alert(e.message)
        }
    },
    async logout({ commit }) {
        const auth = getAuth(this.$firebase)
        await signOut(auth)
                commit('setLoginState', false)
                this.$router.push('/auth/login')
    },
    addUserInfo({commit},payload){
        commit('setLoginState', true )
        commit('setUserUid', payload.uid)
        commit('setEmail',payload.email)
    }
}

