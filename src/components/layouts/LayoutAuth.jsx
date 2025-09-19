import {useEffect} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Header from "@/components/auth/Header";
import Footer from "@/components/auth/Footer";
import "@/assets/styles/style.css";
import loaderStore from "@/store/loaderStore";

const LayoutAuth = () => {
    const {showLoader, hideLoader} = loaderStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        async function validateToken() {
            if (localStorage.getItem("token")) {
                showLoader();
                try {
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    if (
                        location.pathname !== "/" &&
                        location.pathname !== "/home" &&
                        location.pathname !== "/reset-password" &&
                        location.pathname !== "/registro"
                    ) {
                        navigate("/inicio", {replace: true});
                    }
                } catch (err) {
                    console.error("Error validando token:", err);
                    localStorage.removeItem("token");
                    navigate("/login");
                } finally {
                    hideLoader();
                }
            }
        };

        validateToken().then();
    }, [location.pathname, navigate, showLoader, hideLoader]);

    return (
        <div
            style={{
                minHeight: "100dvh",
                display: "flex",
                flexDirection: "column",
                background: "#fff",
            }}
        >
            <Header/>

            <main
                style={{
                    flex: 1,
                    overflow: "auto",
                }}
            >
                <Outlet/>
            </main>

            <footer
                style={{
                    borderTop: "1px solid #f0f0f0",
                    background: "#fff",
                    textAlign: "center",
                }}
            >
                <Footer/>
            </footer>
        </div>
    );
};

export default LayoutAuth;
