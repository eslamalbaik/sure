import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react"; // أيقونة اختيارية

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-white p-4">
      <div className="max-w-md text-center bg-white shadow-2xl rounded-2xl p-10 border border-purple-200">
        <h1 className="text-[100px] font-black text-purple-600 leading-none">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mt-4 mb-2">الصفحة غير موجودة</p>
        <p className="text-gray-600 mb-6">
          للأسف، لم نتمكن من العثور على الصفحة التي تبحث عنها.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-purple-700 transition-all duration-300"
        >
          العودة إلى الصفحة الرئيسية <ArrowRight size={20} />
        </a>
      </div>
    </div>
  );
};

export default NotFound;
