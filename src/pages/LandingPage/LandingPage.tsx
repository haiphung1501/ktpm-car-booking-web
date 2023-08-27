const LandingPage = () => {
  return (
    <div>
      <div className="py-10 text-center text-5xl font-bold text-teal-800">HỆ THỐNG ĐẶT XE</div>
      <img
        className="h-[400px] w-full object-cover object-center"
        src="https://cdn2.vectorstock.com/i/1000x1000/04/46/driving-car-with-hills-on-background-automobile-vector-23830446.jpg"
        alt="background"
      />
      <div className="flex items-center gap-8 p-20">
        <img src="/image.png" className="h-[600px] w-auto" />
        <img src="/customer.png" className="h-[600px] w-auto" />
        <div className="flex flex-col gap-5">
          <div className="ml-10 text-3xl font-bold text-green-700">Customer App</div>
          <div className="ml-10 text-3xl font-bold text-green-700">Driver App</div>
          <img
            src="https://www.constructionplusasia.com/wp-content/uploads/2020/01/Logo-google-play-store-e1578969817208.png"
            className="w-ful"
          />
          <img
            src="data:image/png;base64,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"
            className="w-ful"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
