import { defineStore } from "pinia"
import { useTaskStore } from "../stores/task";
import { ref } from "vue"
import api from "../api";


export const useUserStore = defineStore('user', () => {
    const user = ref({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const isAuthenticated = ref(false);
    const isOpen = ref(false);
    const editingUser = ref({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const isPasswordChange = ref(false);
    const taskStore = useTaskStore();


    const fetchUser = async () => {
            try {
                const response = await api.get('/user');
                console.log('📌取得したユーザーデータ:', response.data);
                setUser(response.data);
                return response.data;
            } catch (error) {
                console.error('❌fetchUser:ユーザー情報取得失敗', error);
                setUser({ id: null, name: '', email: '', password: '' });
            }
    };



    const registerUser = async (userData) => {
        try {
            const response = await api.post('/register',userData);
            console.log(`🔥登録用の受けたデータ:${JSON.stringify(userData, null, 2)}`);
            alert('ユーザー登録が成功しました');
            return response;
        } catch (error) {
            console.error('❌registerUser:ユーザー登録失敗:', error);
            console.log('📌 サーバーからのレスポンス:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'ユーザー登録に失敗しました。';
            alert(errorMessage);
            throw error;
        };
    };



    const setUser = (userData) => {
        isAuthenticated.value = true;
        user.value = userData;
        console.log(`🔥セットされたユーザー:${JSON.stringify(user.value, null, 2)}`);
        console.log(`🔥セットされたユーザーの認証状態:${isAuthenticated.value}`);
    };



    const clearUser = () => {
        user.value = { id: null, name: '', email: '', password: '' };
        isAuthenticated.value = false;
        console.log('🔥ログアウトしたユーザー:', user.value);
        console.log(`🔥ログアウトしたユーザーの認証状態:${isAuthenticated.value}`);
    };



    const loginUser = async (userData) => {
        try {
            await api.get('/sanctum/csrf-cookie');

            const response = await api.post('/login', userData);
            console.log('📌 サーバーからのレスポンス:', response?.data);

            setUser(response.data);

            return response;
        } catch (error) {
            console.log('❌loginUser:ログイン失敗:', error);
            console.log('📌 サーバーからのレスポンス:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'ログインに失敗しました。';
            alert(errorMessage);
            throw error;
        }
    };



    const openModal = () => {
        console.log(`🔥モーダルが受け取ったuser:${JSON.stringify(user.value, null, 2)}`);
        if (!user.value) return;
        editingUser.value = {
            name: user.value.name,
            email: user.value.email,
            password: user.value.password,
        };
        isOpen.value = true;
    };



    const closeModal = () => {
        editingUser.value = {
            id: null,
            name: '',
            email: '',
            password: '',
        };
        isOpen.value = false;
    };



    const logoutUser = async () => {
        try {
            const response = await api.post('/logout');
            console.log('📌 サーバーからのレスポンス:', response?.data);
            clearUser();
            taskStore.clearTasks();
        } catch (error) {
            console.error('❌logoutUser:ログアウト失敗', error);
            console.log('📌 サーバーからのレスポンス:', error.response?.data);
        }
    };



    const updateUser = async () => {
        console.log(`🔥モーダルが表示するUser:${JSON.stringify(user.value, null, 2)}`);

        if (!confirm('ユーザー情報を更新しますか？')) {
            return;
        }
        const newUser = {
            name: editingUser.value.name,
            email: editingUser.value.email,
        };
        if (isPasswordChange.value && editingUser.value.password) {
            newUser.password = editingUser.value.password;
        }
        try {
            const response = await api.put('/user', newUser)

            console.log('📌 サーバーからのレスポンス:', response?.data);
            setUser({
                id: user.value.id,
                name: response.data.name,
                email: response.data.email,
            });
            alert('プロフィールが更新されました！');
            isOpen.value = false;
            closeModal();
            console.log(`🌴ユーザー編集後の状態::${JSON.stringify(user.value, null, 2)}`);
        } catch (error) {
            console.error('❌updateProfile:プロフィール更新失敗', error);
            alert('プロフィール更新に失敗しました。');
        }
    };



    const deleteUser = async () => {
        console.log(`🔥削除するデータ:${JSON.stringify(user.value,null ,2)}`);
        if (!user.value) return;
        try {
            const response = await api.delete('/user/');
            console.log('📌 サーバーからの削除レスポンス:', response.data);
            user.value = {
                id: null,
                name: '',
                email: '',
                password: '',
            };
            alert('🔥ユーザーが削除されました');
        } catch (error) {
            console.error('❌deleteUser:ユーザー削除の失敗:', error);
            alert('❌ユーザー削除に失敗しました');
        }
    };


    return {
        user,
        isAuthenticated,
        isOpen,
        editingUser,
        fetchUser,
        registerUser,
        setUser,
        clearUser,
        loginUser,
        openModal,
        closeModal,
        logoutUser,
        updateUser,
        deleteUser,
        isPasswordChange,
    };
});