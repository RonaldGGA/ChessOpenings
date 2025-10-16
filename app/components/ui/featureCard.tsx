import Image from "next/image";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  stats: string;
  color: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  stats,
  color,
  delay = 0,
}) => {
  const colorClasses = {
    blue: {
      gradient: "from-blue-500 to-blue-600",
      light: "bg-blue-50 border-blue-200",
      text: "text-blue-700",
    },
    purple: {
      gradient: "from-purple-500 to-purple-600",
      light: "bg-purple-50 border-purple-200",
      text: "text-purple-700",
    },
    green: {
      gradient: "from-green-500 to-green-600",
      light: "bg-green-50 border-green-200",
      text: "text-green-700",
    },
  };

  const currentColor = colorClasses[color];

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl hover:scale-105 transition-all duration-500 cursor-pointer"
      style={{
        animationDelay: `${delay}s`,
        animation: "fadeInUp 0.6s ease-out forwards",
      }}
    >
      {/* Hover Effect Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient} rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
      ></div>

      {/* Icon Container */}
      <div
        className={`relative w-16 h-16 bg-gradient-to-br ${currentColor.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
      >
        <div className="relative w-10 h-10 flex items-center justify-center">
          <Image
            src={`/${icon}`}
            alt={`${title} icon`}
            width={32}
            height={32}
          className="filter drop-shadow transition-all duration-300 group-hover:scale-110"
          />
        </div>
        {/* Icon Shadow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${currentColor.gradient} rounded-2xl opacity-50 blur-md group-hover:blur-xl transition-all duration-300`}
        ></div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

      {/* Stats Badge */}
      <div
        className={`inline-flex items-center gap-2 ${currentColor.light
          } border ${currentColor.light.replace(
            "bg-",
            "border-"
          )} rounded-full px-3 py-1`}
      >
        <div
          className={`w-1.5 h-1.5 rounded-full ${currentColor.text} bg-current`}
        ></div>
        <span className={`text-sm font-medium ${currentColor.text}`}>
          {stats}
        </span>
      </div>

      {/* Hover Border Effect */}
      <div
        className={`absolute inset-0 border-2 ${currentColor.gradient
          .replace("from-", "from-")
          .replace(
            "to-",
            "to-"
          )} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
      ></div>
    </div>
  );
};

export default FeatureCard;
