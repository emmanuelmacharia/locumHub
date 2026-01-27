export default defineNuxtPlugin(() => {
  const convex = useConvexClient();
  const auth = useAuth();

  const getToken = async () => {
    return auth.getToken.value({
      template: "convex",
      skipCache: true,
    });
  };

  convex.setAuth(getToken);
});
