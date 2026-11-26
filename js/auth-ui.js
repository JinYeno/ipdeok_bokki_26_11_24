
/* ========================================
   COMMON MEMBER & GUEST UI
======================================== */

(function () {

    function renderAuthUI() {

        const auth = window.IpdeokAuth;

        const sideMenu =
            document.querySelector(".side-menu");

        if (!auth || !sideMenu) return;

        const nav = sideMenu.querySelector(
            ".side-menu-nav, .side-navigation"
        );

        if (!nav) return;

        const loginLink = Array.from(
            nav.querySelectorAll("a")
        ).find(function (link) {

            return link.href.includes(
                "/login/login.html"
            );

        });

        if (!loginLink) return;

        const loginURL = loginLink.href;

        const isMember = auth.isLoggedIn();


        // 기존 환영 문구 찾기

        const oldWelcome = sideMenu.querySelector(
            ".side-menu-welcome, .side-welcome"
        );


        // 중복 생성 방지

        const oldCard = sideMenu.querySelector(
            ".common-auth-card"
        );

        const oldLogout = sideMenu.querySelector(
            ".common-auth-logout"
        );

        if (oldCard) oldCard.remove();

        if (oldLogout) oldLogout.remove();


        // 회원 및 비회원 카드 생성

        const card = document.createElement("section");

        card.className = "common-auth-card";

        if (isMember) {

            card.classList.add("is-member");

            card.innerHTML = `

                <span class="common-auth-eyebrow">
                    WELCOME BACK!
                </span>

                <h2>
                    입덕러님,<br>
                    반가워요!
                </h2>

                <p>
                    오늘은 어떤 떡볶이에 입덕할까요?
                </p>

                <div class="common-auth-benefits">

                    <div class="common-auth-benefit">

                        <i data-lucide="ticket"></i>

                        <span>보유 쿠폰</span>

                        <strong>0장</strong>

                    </div>

                    <div class="common-auth-benefit">

                        <i data-lucide="coins"></i>

                        <span>적립 포인트</span>

                        <strong>0P</strong>

                    </div>

                </div>

                <a class="common-auth-action">

                    <i data-lucide="user-round"></i>

                    마이페이지

                    <i data-lucide="chevron-right"></i>

                </a>

            `;

        } else {

            card.innerHTML = `

                <span class="common-auth-eyebrow">
                    WELCOME TO IPDEOK
                </span>

                <h2>
                    오늘도 맛있게,<br>
                    입덕볶이!
                </h2>

                <p>
                    로그인하고 특별한 혜택을 만나보세요.
                </p>

                <a class="common-auth-action">

                    <i data-lucide="user-round"></i>

                    로그인 / 회원가입

                    <i data-lucide="chevron-right"></i>

                </a>

            `;

        }


        // 로그인 페이지 연결

        card.querySelector(
            ".common-auth-action"
        ).href = loginURL;


        // 기존 환영 영역 숨기기

        if (oldWelcome) {

            oldWelcome.style.display = "none";

        }


        // 메뉴 목록 바로 위에 카드 추가

        nav.before(card);


        // 로그인 메뉴 문구 변경

        const loginText = loginLink.querySelector("span");

        if (loginText) {

            loginText.textContent =
                isMember ? "마이페이지" : "로그인";

        }


        // 회원일 때 로그아웃 버튼 생성

        if (isMember) {

            const logoutButton =
                document.createElement("button");

            logoutButton.type = "button";

            logoutButton.className =
                "common-auth-logout";

            logoutButton.innerHTML = `

                <i data-lucide="log-out"></i>

                <span>로그아웃</span>

            `;

            logoutButton.addEventListener(
                "click",
                function () {

                    auth.logout();

                    window.location.reload();

                }
            );

            nav.appendChild(logoutButton);

        }


        // 아이콘 실행

        if (window.lucide) {

            window.lucide.createIcons();

        }

    }


    // 페이지 로딩 완료 후 실행

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            renderAuthUI
        );

    } else {

        renderAuthUI();

    }


    // 다른 탭에서 로그인 상태가 변경된 경우

    window.addEventListener(
        "storage",
        renderAuthUI
    );


    // 뒤로 가기로 돌아온 경우

    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                renderAuthUI();

            }

        }
    );

})();
