
/* ========================================
   IPDEOK BOKKI V2.0
   COMMON AUTH SYSTEM
======================================== */

(function () {

    const LOGIN_KEY = 'ipdeok-demo-login-v1';

    function isLoggedIn() {

        try {
            return localStorage.getItem(LOGIN_KEY) === 'demo' ||
                   sessionStorage.getItem(LOGIN_KEY) === 'demo';
        } catch (error) {
            return false;
        }

    }

    function login(remember = false) {

        try {

            localStorage.removeItem(LOGIN_KEY);
            sessionStorage.removeItem(LOGIN_KEY);

            const storage = remember
                ? localStorage
                : sessionStorage;

            storage.setItem(LOGIN_KEY, 'demo');

            return true;

        } catch (error) {
            return false;
        }

    }

    function logout() {

        try {

            localStorage.removeItem(LOGIN_KEY);
            sessionStorage.removeItem(LOGIN_KEY);

            return true;

        } catch (error) {
            return false;
        }

    }

    function getUser() {

        if (!isLoggedIn()) return null;

        return {
            id: 'demo',
            name: '입덕러',
            grade: 'WELCOME',
            coupons: 0,
            points: 0
        };

    }

    window.IpdeokAuth = {
        isLoggedIn,
        login,
        logout,
        getUser
    };

})();
