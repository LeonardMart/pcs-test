import React, { FC } from "react";
import PillIcon from "./pill";
import GoldCoin from "./gold-coin";
//@ts-ignore
import AlarmIcon from "./alarm/reveil.svg";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
//@ts-ignore
import { X, Check, MoveRight } from "lucide-react-native";

interface IconSelect {
  type: string;
  status: string;
}

const IconSelector: FC<IconSelect> = ({ type, status }) => {
  const statusIcons: Record<string, { icon: JSX.Element; bgColor: string }> = {
    rejected: { icon: <X size={12} color="white" />, bgColor: "bg-red-500" },
    approved: {
      icon: <Check size={12} color="white" />,
      bgColor: "bg-green-500",
    },
    processed: {
      icon: <MoveRight size={12} color="white" />,
      bgColor: "bg-blue-500",
    },
    paid: { icon: <Check size={12} color="white" />, bgColor: "bg-green-500" },
  };

  const typeIcons: Record<string, JSX.Element> = {
    Reimbursement: <GoldCoin width={32} height={32} />,
    Sickness: <PillIcon width={32} height={32} />,
    Overtime: <AlarmIcon width={32} height={32} />,
  };

  return (
    <View className="relative">
      <LinearGradient
        colors={["#EF4444", "#be185d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ borderRadius: 12, width: 50, height: 50 }}
        className="p-4 flex items-center justify-center"
      >
        {typeIcons[type] || <GoldCoin width={32} height={32} />}
      </LinearGradient>

      {statusIcons[status] && (
        <View
          className={`absolute -bottom-0.5 -right-2 ${statusIcons[status].bgColor} rounded-full p-1`}
        >
          {statusIcons[status].icon}
        </View>
      )}
    </View>
  );
};

export default IconSelector;
