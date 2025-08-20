import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";

export const meta = () => {
  return [
    { title: "Andishi - Auth" },
    {
      name: "description",
      content: "Login to your account to start using Andishi - Talent Tracker",
    },
  ];
};

const auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, auth } = usePuterStore();
  const next = location.search.split("next=")[1];

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next || "/");
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col items-center text-center rounded-2xl p-10">
          <div className="flex flex-col items-center text-center">
            <h1>Welcome</h1>
            <h2>Login to your account</h2>
          </div>

          <div className="mt-8 mb-2">
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p className="monty uppercase">signing you in</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button
                    className="auth-button"
                    onClick={() => auth.signOut()}
                  >
                    <p className="monty uppercase">sign out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={() => auth.signIn()}>
                    <p className="monty uppercase">sign in</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default auth;
