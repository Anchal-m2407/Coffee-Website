/* =========================================================
   COFFEE WEBSITE - COMPLETE SCRIPT.JS
   Works with your current index.html + style.css
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       1. MOBILE NAVIGATION
    ===================================================== */

    const menuOpenButton = document.getElementById("menu-open-button");
    const menuCloseButton = document.getElementById("menu-close-button");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuOpenButton && navMenu) {
        menuOpenButton.addEventListener("click", () => {
            document.body.classList.add("show-mobile-menu");
        });
    }

    if (menuCloseButton) {
        menuCloseButton.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            document.body.classList.remove("show-mobile-menu");
        });
    });


    /* =====================================================
       2. DARK / LIGHT MODE
    ===================================================== */

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle
        ? themeToggle.querySelector("i")
        : null;

    const savedTheme = localStorage.getItem("coffee-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");

        if (themeIcon) {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");

            if (isDark) {
                localStorage.setItem("coffee-theme", "dark");

                if (themeIcon) {
                    themeIcon.classList.remove("fa-moon");
                    themeIcon.classList.add("fa-sun");
                }
            } else {
                localStorage.setItem("coffee-theme", "light");

                if (themeIcon) {
                    themeIcon.classList.remove("fa-sun");
                    themeIcon.classList.add("fa-moon");
                }
            }
        });
    }


    /* =====================================================
       3. SEARCH BOX
    ===================================================== */

    const searchIcon = document.querySelector(".search-icon");
    const searchBox = document.getElementById("search-box");
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    const searchSubmit = document.getElementById("search-submit");

    const products = document.querySelectorAll(".product-card");

    if (searchIcon && searchBox) {

        searchIcon.addEventListener("click", (e) => {
            e.preventDefault();

            searchBox.classList.toggle("open");

            if (searchBox.classList.contains("open") && searchInput) {
                setTimeout(() => {
                    searchInput.focus();
                }, 100);
            }
        });
    }


    function performSearch() {

        if (!searchInput || !searchResults) {
            return;
        }

        const query = searchInput.value.trim().toLowerCase();

        searchResults.innerHTML = "";

        if (query === "") {
            return;
        }

        let foundProducts = [];

        products.forEach(product => {

            const name = (
                product.dataset.name ||
                product.querySelector("h3")?.textContent ||
                ""
            ).toLowerCase();

            if (name.includes(query)) {
                foundProducts.push(product);
            }

        });


        if (foundProducts.length === 0) {

            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fa-solid fa-mug-hot"></i>
                    <p>No coffee found for "${escapeHTML(query)}"</p>
                </div>
            `;

            return;
        }


        foundProducts.forEach(product => {

            const name =
                product.dataset.name ||
                product.querySelector("h3")?.textContent ||
                "Coffee";

            const image =
                product.querySelector("img")?.getAttribute("src") ||
                "";

            const price =
                product.querySelector(".product-price strong")?.textContent ||
                "";


            const result = document.createElement("div");

            result.className = "search-result-item";

            result.innerHTML = `
                <img src="${image}" alt="${escapeHTML(name)}">

                <div class="search-result-info">
                    <h4>${escapeHTML(name)}</h4>
                    <p>${escapeHTML(price)}</p>
                </div>

                <i class="fa-solid fa-arrow-right"></i>
            `;


            result.addEventListener("click", () => {

                searchBox.classList.remove("open");

                product.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

                product.classList.remove("search-highlight");

                setTimeout(() => {
                    product.classList.add("search-highlight");
                }, 100);

                setTimeout(() => {
                    product.classList.remove("search-highlight");
                }, 2200);

            });


            searchResults.appendChild(result);

        });
    }


    if (searchInput) {
        searchInput.addEventListener("input", performSearch);

        searchInput.addEventListener("keydown", (e) => {

            if (e.key === "Enter") {
                e.preventDefault();
                performSearch();
            }

        });
    }


    if (searchSubmit) {
        searchSubmit.addEventListener("click", performSearch);
    }


    /* =====================================================
       4. CLOSE SEARCH WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", (e) => {

        if (
            searchBox &&
            searchIcon &&
            !searchBox.contains(e.target) &&
            !searchIcon.contains(e.target)
        ) {
            searchBox.classList.remove("open");
        }

    });


    /* =====================================================
       5. LOGIN POPUP
    ===================================================== */

    const loginButton = document.getElementById("login-button");
    const loginOverlay = document.getElementById("login-overlay");
    const loginClose = document.getElementById("login-close");
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    if (loginButton && loginOverlay) {

        loginButton.addEventListener("click", () => {

            loginOverlay.classList.add("active");

            document.body.style.overflow = "hidden";

            const emailInput =
                document.getElementById("login-email");

            if (emailInput) {
                setTimeout(() => {
                    emailInput.focus();
                }, 200);
            }

        });

    }


    function closeLogin() {

        if (!loginOverlay) return;

        loginOverlay.classList.remove("active");

        document.body.style.overflow = "";

        if (loginError) {
            loginError.textContent = "";
        }

    }


    if (loginClose) {
        loginClose.addEventListener("click", closeLogin);
    }


    if (loginOverlay) {

        loginOverlay.addEventListener("click", (e) => {

            if (e.target === loginOverlay) {
                closeLogin();
            }

        });

    }


    /* =====================================================
       6. PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordToggle =
        document.getElementById("password-toggle");

    const passwordInput =
        document.getElementById("login-password");


    if (passwordToggle && passwordInput) {

        passwordToggle.addEventListener("click", () => {

            const icon =
                passwordToggle.querySelector("i");

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                if (icon) {
                    icon.classList.remove("fa-eye");
                    icon.classList.add("fa-eye-slash");
                }

                passwordToggle.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                if (icon) {
                    icon.classList.remove("fa-eye-slash");
                    icon.classList.add("fa-eye");
                }

                passwordToggle.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    }


    /* =====================================================
       7. LOGIN FORM
    ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const email =
                document.getElementById("login-email")?.value.trim();

            const password =
                document.getElementById("login-password")?.value.trim();

            if (loginError) {
                loginError.textContent = "";
            }


            if (!email || !password) {

                if (loginError) {
                    loginError.textContent =
                        "Please enter email and password.";
                }

                return;
            }


            if (password.length < 6) {

                if (loginError) {
                    loginError.textContent =
                        "Password must contain at least 6 characters.";
                }

                return;
            }


            if (!email.includes("@")) {

                if (loginError) {
                    loginError.textContent =
                        "Please enter a valid email address.";
                }

                return;
            }


            if (loginError) {
                loginError.style.color = "#2e7d32";
                loginError.textContent =
                    "Login successful! Welcome to Coffee House.";
            }


            setTimeout(() => {
                closeLogin();
            }, 1200);

        });

    }


    /* =====================================================
       8. FORGOT PASSWORD
    ===================================================== */

    const forgotPassword =
        document.getElementById("forgot-password");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", (e) => {

            e.preventDefault();

            const email =
                document.getElementById("login-email")?.value.trim();

            if (!email) {

                if (loginError) {
                    loginError.style.color = "#d32f2f";
                    loginError.textContent =
                        "Please enter your email first.";
                }

                return;
            }


            if (loginError) {
                loginError.style.color = "#2e7d32";
                loginError.textContent =
                    "Password reset link sent to your email.";
            }

        });

    }


    /* =====================================================
       9. CREATE ACCOUNT
    ===================================================== */

    const registerLink =
        document.getElementById("register-link");

    if (registerLink) {

        registerLink.addEventListener("click", (e) => {

            e.preventDefault();

            if (loginError) {
                loginError.style.color = "#2e7d32";
                loginError.textContent =
                    "Registration feature is ready to connect.";
            }

        });

    }


    /* =====================================================
       10. CART
    ===================================================== */

    const cartButton =
        document.getElementById("cart-button");

    const cartOverlay =
        document.getElementById("cart-overlay");

    const cartDrawer =
        document.getElementById("cart-drawer");

    const cartClose =
        document.getElementById("cart-close");

    const cartItemsContainer =
        document.getElementById("cart-items");

    const emptyCart =
        document.getElementById("empty-cart");

    const cartFooter =
        document.getElementById("cart-footer");

    const cartCount =
        document.getElementById("cart-count");

    const cartSubtotal =
        document.getElementById("cart-subtotal");

    const cartTotal =
        document.getElementById("cart-total");

    const continueShopping =
        document.getElementById("continue-shopping");


    let cart = JSON.parse(
        localStorage.getItem("coffee-cart") || "[]"
    );


    function saveCart() {

        localStorage.setItem(
            "coffee-cart",
            JSON.stringify(cart)
        );

    }


    function openCart() {

        if (!cartDrawer || !cartOverlay) return;

        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");

    }


    function closeCart() {

        if (!cartDrawer || !cartOverlay) return;

        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");

    }


    if (cartButton) {
        cartButton.addEventListener("click", openCart);
    }


    if (cartClose) {
        cartClose.addEventListener("click", closeCart);
    }


    if (cartOverlay) {
        cartOverlay.addEventListener("click", closeCart);
    }


    if (continueShopping) {
        continueShopping.addEventListener("click", closeCart);
    }


    function addToCart(name, price, image) {

        const existingItem =
            cart.find(item => item.name === name);


        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            cart.push({
                name: name,
                price: Number(price),
                image: image,
                quantity: 1
            });

        }


        saveCart();
        renderCart();
        openCart();

    }


    function removeFromCart(index) {

        cart.splice(index, 1);

        saveCart();
        renderCart();

    }


    function changeQuantity(index, change) {

        if (!cart[index]) return;

        cart[index].quantity += change;

        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart();
        renderCart();

    }


    function renderCart() {

        if (!cartItemsContainer) return;


        cartItemsContainer.innerHTML = "";


        if (cart.length === 0) {

            if (emptyCart) {
                emptyCart.classList.add("show");
            }

            if (cartFooter) {
                cartFooter.style.display = "none";
            }

        } else {

            if (emptyCart) {
                emptyCart.classList.remove("show");
            }

            if (cartFooter) {
                cartFooter.style.display = "block";
            }


            cart.forEach((item, index) => {

                const cartItem =
                    document.createElement("div");

                cartItem.className = "cart-item";


                cartItem.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.name)}"
                        class="cart-item-image"
                    >

                    <div class="cart-item-details">

                        <h4>
                            ${escapeHTML(item.name)}
                        </h4>

                        <span class="cart-item-price">
                            ₹${item.price}
                        </span>

                        <div class="quantity-controls">

                            <button
                                class="quantity-btn decrease"
                                type="button"
                            >
                                −
                            </button>

                            <span class="quantity-value">
                                ${item.quantity}
                            </span>

                            <button
                                class="quantity-btn increase"
                                type="button"
                            >
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-cart-item"
                        type="button"
                        aria-label="Remove item"
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>

                `;


                const decrease =
                    cartItem.querySelector(".decrease");

                const increase =
                    cartItem.querySelector(".increase");

                const remove =
                    cartItem.querySelector(".remove-cart-item");


                decrease.addEventListener("click", () => {
                    changeQuantity(index, -1);
                });


                increase.addEventListener("click", () => {
                    changeQuantity(index, 1);
                });


                remove.addEventListener("click", () => {
                    removeFromCart(index);
                });


                cartItemsContainer.appendChild(cartItem);

            });

        }


        updateCartSummary();

    }


    function updateCartSummary() {

        const totalQuantity =
            cart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );


        const subtotal =
            cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );


        if (cartCount) {
            cartCount.textContent = totalQuantity;
        }


        if (cartSubtotal) {
            cartSubtotal.textContent =
                `₹${subtotal}`;
        }


        if (cartTotal) {
            cartTotal.textContent =
                `₹${subtotal}`;
        }

    }


    /* =====================================================
       11. ADD TO CART BUTTONS
    ===================================================== */

    const addCartButtons =
        document.querySelectorAll(".add-cart");


    addCartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);

            const image =
                button.dataset.image;


            addToCart(name, price, image);


            button.classList.add("added");

            const originalHTML =
                button.innerHTML;

            button.innerHTML =
                `<i class="fa-solid fa-check"></i> Added`;


            setTimeout(() => {

                button.classList.remove("added");
                button.innerHTML = originalHTML;

            }, 1200);

        });

    });


    renderCart();


    /* =====================================================
       12. CHECKOUT
    ===================================================== */

    const checkoutButton =
        document.getElementById("checkout-button");


    if (checkoutButton) {

        checkoutButton.addEventListener("click", () => {

            if (cart.length === 0) {

                alert("Your cart is empty. Please add coffee first.");

                return;
            }


            const total =
                cart.reduce(
                    (sum, item) =>
                        sum + item.price * item.quantity,
                    0
                );


            alert(
                `Checkout successful!\n\nTotal Amount: ₹${total}\n\nThank you for ordering from Coffee House.`
            );

        });

    }


    /* =====================================================
       13. QUICK VIEW
    ===================================================== */

    const quickViewButtons =
        document.querySelectorAll(".quick-view");


    quickViewButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".product-card");

            if (!card) return;


            const name =
                card.dataset.name ||
                card.querySelector("h3")?.textContent ||
                "Coffee";

            const price =
                card.querySelector(".product-price strong")
                ?.textContent || "";

            const description =
                card.querySelector(".product-body > p")
                ?.textContent || "";


            alert(
                `${name}\n\n${description}\n\nPrice: ${price}`
            );

        });

    });


    /* =====================================================
       14. PRICING PLAN BUTTONS
    ===================================================== */

    const pricingButtons =
        document.querySelectorAll(".price-order-btn");


    pricingButtons.forEach(button => {

        button.addEventListener("click", () => {

            const plan =
                button.dataset.plan;

            const price =
                button.dataset.price;


            pricingButtons.forEach(btn => {
                btn.classList.remove("selected");
            });


            button.classList.add("selected");


            const originalHTML =
                button.innerHTML;


            button.innerHTML =
                `<i class="fa-solid fa-check"></i> Selected`;


            alert(
                `${plan} Plan selected!\n\nPrice: ₹${price}/month`
            );


            setTimeout(() => {

                button.innerHTML = originalHTML;

            }, 1800);

        });

    });


    /* =====================================================
       15. STATISTICS COUNTER
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const counterObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;


                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.target) || 0;

                let current = 0;

                const duration = 1800;

                const startTime =
                    performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);


                    const ease =
                        1 - Math.pow(1 - progress, 3);


                    current =
                        Math.floor(target * ease);


                    counter.textContent =
                        current.toLocaleString();


                    if (progress < 1) {

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.textContent =
                            target.toLocaleString();

                    }

                }


                requestAnimationFrame(updateCounter);

                observer.unobserve(counter);

            });

        }, {
            threshold: 0.4
        });


    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =====================================================
       16. SCROLL ANIMATIONS
    ===================================================== */

    const animatedElements =
        document.querySelectorAll("[data-animation]");


    const animationObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show-animation");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.15
        });


    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });


    /* =====================================================
       17. HERO ANIMATION
    ===================================================== */

    const heroSection =
        document.querySelector(".hero-section");


    if (heroSection) {

        setTimeout(() => {

            heroSection.classList.add("hero-visible");

        }, 150);

    }


    /* =====================================================
       18. SWIPER TESTIMONIALS
    ===================================================== */

    if (
        typeof Swiper !== "undefined" &&
        document.querySelector(".slider-container")
    ) {

        new Swiper(".slider-container", {

            loop: true,

            spaceBetween: 25,

            grabCursor: true,

            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },

            breakpoints: {

                0: {
                    slidesPerView: 1
                },

                768: {
                    slidesPerView: 2
                },

                1024: {
                    slidesPerView: 3
                }

            }

        });

    }


    /* =====================================================
       19. FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");


        if (!question) return;


        question.addEventListener("click", () => {

            const isActive =
                item.classList.contains("active");


            faqItems.forEach(otherItem => {

                otherItem.classList.remove("active");

            });


            if (!isActive) {
                item.classList.add("active");
            }

        });

    });


    /* =====================================================
       20. ORDER FORM
    ===================================================== */

    const orderForm =
        document.querySelector(".order-form");


    if (orderForm) {

        orderForm.addEventListener("submit", (e) => {

            e.preventDefault();


            const name =
                orderForm.querySelector(
                    'input[type="text"]'
                )?.value.trim();


            const coffee =
                orderForm.querySelector("select")?.value;


            const quantity =
                orderForm.querySelector(
                    'input[type="number"]'
                )?.value;


            const address =
                orderForm.querySelector("textarea")?.value.trim();


            if (
                !name ||
                !coffee ||
                coffee === "Select Coffee" ||
                !quantity ||
                !address
            ) {

                alert(
                    "Please fill all order details."
                );

                return;
            }


            alert(
                `Order placed successfully!\n\n` +
                `Name: ${name}\n` +
                `Coffee: ${coffee}\n` +
                `Quantity: ${quantity}\n\n` +
                `Thank you for ordering!`
            );


            orderForm.reset();

        });

    }


    /* =====================================================
       21. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");


    if (contactForm) {

        contactForm.addEventListener("submit", (e) => {

            e.preventDefault();


            const inputs =
                contactForm.querySelectorAll(
                    ".form-input"
                );


            let valid = true;


            inputs.forEach(input => {

                if (!input.value.trim()) {
                    valid = false;
                }

            });


            if (!valid) {

                alert(
                    "Please fill all contact form fields."
                );

                return;
            }


            alert(
                "Thank you! Your message has been submitted successfully."
            );


            contactForm.reset();

        });

    }


    /* =====================================================
       22. NEWSLETTER
    ===================================================== */

    const subscribeForm =
        document.querySelector(".subscribe-form");


    if (subscribeForm) {

        subscribeForm.addEventListener("submit", (e) => {

            e.preventDefault();


            const email =
                subscribeForm.querySelector("input")
                ?.value.trim();


            if (!email || !email.includes("@")) {

                alert(
                    "Please enter a valid email address."
                );

                return;
            }


            alert(
                "Thank you for subscribing to Coffee House!"
            );


            subscribeForm.reset();

        });

    }


    /* =====================================================
       23. BACK TO TOP
    ===================================================== */

    const topButton =
        document.getElementById("topBtn");


    if (topButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {

                topButton.style.display = "flex";

            } else {

                topButton.style.display = "none";

            }

        });


        topButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       24. ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (e) => {

        if (e.key !== "Escape") return;


        closeLogin();
        closeCart();


        if (searchBox) {
            searchBox.classList.remove("open");
        }


        document.body.classList.remove(
            "show-mobile-menu"
        );

    });


    /* =====================================================
       25. PREVENT EMPTY # LINKS
    ===================================================== */

    document.querySelectorAll('a[href="#"]').forEach(link => {

        link.addEventListener("click", (e) => {

            const id =
                link.getAttribute("id");


            const allowedIDs = [
                "forgot-password",
                "register-link"
            ];


            if (!allowedIDs.includes(id)) {
                e.preventDefault();
            }

        });

    });


    /* =====================================================
       26. SMOOTH NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", (e) => {

            const targetID =
                link.getAttribute("href");


            if (
                !targetID ||
                targetID === "#" ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (target) {

                e.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       27. IMAGE ERROR HANDLING
    ===================================================== */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.style.background =
                "var(--cream-color)";

            img.style.objectFit = "contain";

            img.alt =
                img.alt || "Coffee image";

        });

    });


    /* =====================================================
       28. HELPER FUNCTION
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       29. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "☕ Coffee Website JavaScript loaded successfully!"
    );

});