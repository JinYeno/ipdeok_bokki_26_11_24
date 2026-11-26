
(function () {

    const ORDER_KEY = "ipdeok-order-history-v1";


    // 저장된 주문 내역 불러오기

    function readOrders() {

        try {

            const data = JSON.parse(
                localStorage.getItem(ORDER_KEY) || "[]"
            );

            return Array.isArray(data) ? data : [];

        } catch (error) {

            return [];

        }

    }


    // 회원 주문 내역 저장

    function saveOrder(payment) {

        const auth = window.IpdeokAuth;

        if (!auth || !auth.isLoggedIn()) {
            return false;
        }

        const user = auth.getUser();

        if (
            !user ||
            !payment ||
            payment.status !== "completed" ||
            !payment.orderNumber
        ) {
            return false;
        }

        const orders = readOrders();


        // 중복 주문 저장 방지

        const duplicated = orders.some(function (item) {

            return item.orderNumber === payment.orderNumber;

        });

        if (duplicated) {
            return true;
        }


        // 필요한 주문 정보만 저장

        const newOrder = {

            userId: user.id,

            orderNumber: payment.orderNumber,

            name: payment.name,

            image: payment.image,

            spicy: payment.spicy,

            quantity: payment.quantity,

            finalAmount: payment.finalAmount,

            paidAt: payment.paidAt,

            status: "completed"

        };

        orders.unshift(newOrder);

        try {

            localStorage.setItem(
                ORDER_KEY,
                JSON.stringify(orders)
            );

            return true;

        } catch (error) {

            return false;

        }

    }


    // 현재 회원의 주문 내역 조회

    function getOrders() {

        const auth = window.IpdeokAuth;

        if (!auth || !auth.isLoggedIn()) {
            return [];
        }

        const user = auth.getUser();

        if (!user) return [];

        return readOrders()

            .filter(function (item) {

                return item.userId === user.id;

            })

            .sort(function (a, b) {

                return new Date(b.paidAt) -
                       new Date(a.paidAt);

            });

    }


    // 공통 기능 등록

    window.IpdeokOrders = {

        saveOrder,

        getOrders

    };

})();
