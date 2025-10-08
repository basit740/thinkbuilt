import Footer from "./Footer";
import Header from "./Header";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col bg-black">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default DashboardWrapper;
