import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { cacheTime: 1000 * 60 * 60 * 24 },
  },
});

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Nav />
      <Component {...pageProps} />
      <Footer />
    </QueryClientProvider>
  );
}
