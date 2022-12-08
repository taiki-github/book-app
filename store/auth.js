import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
  } from "firebase/firestore";
  

export const state = () => ({
    isLoggedIn: false,
    userUid: '',
    email: '',
    userName:'未登録'
})

export const mutations = {
    setLoginState(state, loggedIn,) {
        state.isLoggedIn = loggedIn
    },
    setEmail(state,email){
       state.email = email
    },
    setUserUid( state, userUid ){
        state.userUid = userUid
      },
    setUserName(state,userName){
        if(userName){
       state.userName = userName
        }else{
       state.userName = "未登録"
        }
    }
    
}

export const actions = {
    async login({ commit }, payload) {
        try {
            // vuexの引数には注意する
            const auth = getAuth(this.$firebase)
            const db = getFirestore(this.$firebase);
           

            await signInWithEmailAndPassword(auth, payload.email, payload.password)
            .then(userCredential=>{
                commit('setLoginState', true )
            commit('setEmail',payload.email)
            commit('setUserUid', userCredential.user.uid)
        })
        const Name =  await getDoc(doc(db, "userName", payload.email));
        const userName=Name.data().name;
        commit('setUserName',userName)
        this.$router.push('/home')
            
        } catch (e) {
            alert(e.message)
        }
    },
    async logout({ commit }) {
        const auth = getAuth(this.$firebase)
        await signOut(auth)
                commit('setLoginState', false)
                commit('setUserUid', '')
                this.$router.push('/auth/login')
    },
    async addUserInfo({commit},payload){
        const db = getFirestore(this.$firebase);
        const Name =  await getDoc(doc(db, "userName", payload.email));
        const userName=Name.data().name;
        commit('setLoginState', true )
        commit('setUserUid', payload.uid)
        commit('setEmail',payload.email)
        commit('setUserName',userName)
        
    }
}
export const getters = {
    getLoggedIn: state => !!state.isLoggedIn,
    getUserUid: state => state.userUid,
    getEmail: state => state.email
  }

