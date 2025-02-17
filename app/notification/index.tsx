import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import IconSelector from "@/assets/icon/notificationSelector";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { markAsSeen } from "@/store/notification/notificationSlice";

const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toISOString().split("T")[0]
};

const getDescription = (type: string, status: string) => {
  const messages: Record<string, string> = {
    approved: `Your submission has been approved by the Superior.`,
    rejected: `Your submission has been rejected, please confirm with your Superior.`,
    processed: `Your submission will be processed according to the reimbursement schedule. Please wait.`,
    reviewed: `Your submission is being reviewed by the Superior for the approval process, please wait.`,
    paid: `Your submission "Lorem ipsum dolor sit amet..." with the total cost of 50,000 has been paid, please check your BRIMO application, Thank you.`,
  };

  return messages[status] || "Your submission is being processed.";
};

const NotificationPage = () => {
  const dispatch = useAppDispatch();
  const notif = useAppSelector((state) => state.notifications.notifications);

  return (
    <View className="flex flex-col">
      <ScrollView>
        {notif.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => dispatch(markAsSeen(item.id))}
            className={`flex flex-row gap-4 p-4 justify-between w-full ${
              item.seen ? "bg-white" : "bg-blue-100"
            }`}
          >
            <View className="flex flex-row gap-4 flex-1">
              <Text>
                <IconSelector status={item.status} type={item.type} />
              </Text>
              <View className="flex w-full flex-1 gap-1">
                <Text className="text-black font-bold">{item.type}</Text>
                <Text className="text-black font-normal">
                  {getDescription(item.type, item.status)}
                </Text>
              </View>
            </View>
            <Text className="text-gray-400 font-normal text-sm">{formatDate(item.date)}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default NotificationPage;
