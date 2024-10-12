import logo from "@/assets/LOGO_IMDAZ.png"; 

const LogoImdaz: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-2 lg:p-8">
      <img src={logo} alt="IMDAZ Logo" className="w-full" />
    </div>
  );
};

export default LogoImdaz;
