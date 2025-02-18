import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BellIcon from "@/assets/icon/bell";
import { LinearGradient } from "expo-linear-gradient";
import ClockEightIcon from "@/assets/icon/clock";
import ClockSixthIcon from "@/assets/icon/clockSixth";
import TimerIcon from "@/assets/icon/timer";
//@ts-ignore
import HTMLView from "react-native-htmlview";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Link } from "expo-router";
import "dayjs/locale/id";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCheckIn } from "@/store/user/userSlice";

const dummyNewsData = [
  {
    id: 1,
    image_url: "https://avatar.iran.liara.run/public",
    name: "Ana Riswati",
    news: "<p>Kalimat 1 - Lorem ipsum dolor sit amet consec<br>Kalimat 2 - Lorem ipsum dolor sit amet consec<br>Kalimat 3 - Lorem ipsum dolor sit amet consec<br>Kalimat 4 - Lorem ipsum dolor sit amet consec</p>",
    created_at: "2024-02-16T14:30:00Z",
  },
  {
    id: 2,
    image_url: "https://avatar.iran.liara.run/public",
    name: "Ana Riswati",
    news: "<p>Kalimat 1 - Lorem ipsum dolor sit amet consec<br>Kalimat 2 - Lorem ipsum dolor sit amet consec<br>Kalimat 3 - Lorem ipsum dolor sit amet consec<br>Kalimat 4 - Lorem ipsum dolor sit amet consec</p>",
    created_at: "2024-01-28T14:30:00Z",
  },
  {
    id: 3,
    image_url: "https://avatar.iran.liara.run/public/65",
    name: "Elsa Frozen",
    news: "<p>Kalimat 1 - Lorem ipsum dolor sit amet consec<br>Kalimat 2 - Lorem ipsum dolor sit amet consec<br>Kalimat 3 - Lorem ipsum dolor sit amet consec<br>Kalimat 4 - Lorem ipsum dolor sit amet consec</p>",
    created_at: "2024-01-20T14:30:00Z",
  },
];

const dummyOnlineUsers = [
  {
    id: 1,
    name: "Jefril",
    location: "Sahid",
    image: "https://avatar.iran.liara.run/public/1",
  },
  {
    id: 2,
    name: "Zasami",
    location: "BSD",
    image: "https://avatar.iran.liara.run/public/2",
  },
  {
    id: 3,
    name: "Sam",
    location: "Sahid",
    image: "https://avatar.iran.liara.run/public/3",
  },
  {
    id: 4,
    name: "Aldo",
    location: "Sahid",
    image: "https://avatar.iran.liara.run/public/4",
  },
  {
    id: 5,
    name: "Erwin",
    location: "Sahid",
    image: "https://avatar.iran.liara.run/public/5",
  },
  {
    id: 6,
    name: "Arye",
    location: "BSD",
    image: "https://avatar.iran.liara.run/public/6",
  },
  {
    id: 7,
    name: "Risya",
    location: "BSD",
    image: "https://avatar.iran.liara.run/public/7",
  },
  {
    id: 8,
    name: "Nesha",
    location: "WFH",
    image: "https://avatar.iran.liara.run/public/8",
  },
];

const HomeScreen = () => {
  const [activeIndex, setActiveIndex] = useState<Number>(0);
  const [workingHours, setWorkingHours] = useState("00:00:00");
  const { width } = Dimensions.get("window");
  const notif = useAppSelector((state) => state.notifications.notifications);
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const unreadCount = notif.filter((n) => !n.seen).length;
  const max_online_user = 7;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };
  const formatTime = (time: string | null) => {
    console.log("check", time);
    if (!time) return "--:--";
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string) => {
    const date = dayjs(dateString).locale("id");
    return {
      day: date.format("dddd"),
      date: date.format("DD MMMM YYYY"),
    };
  };

  const calculateElapsedTime = () => {
    const checkInTime = new Date(user?.check_in ?? "").getTime();
    const endTime = user?.check_out
      ? new Date(user.check_out).getTime()
      : new Date().getTime();
    console.log("check end", endTime);

    if (endTime < checkInTime) return;

    const elapsed = Math.floor((endTime - checkInTime) / 1000);
    const hours = String(Math.floor(elapsed / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
    const seconds = String(elapsed % 60).padStart(2, "0");
    console.log("elapsed", `${hours}:${minutes}:${seconds}`);
    console.log("workingHours1", workingHours);
    setWorkingHours(`${hours}:${minutes}:${seconds}`);
    console.log("workingHours2", workingHours);
  };

  useEffect(() => {
    if (!user?.check_in && !user?.check_out) {
      setWorkingHours("00:00:00");
      return;
    }
    if (!user?.check_out) {
      const interval = setInterval(calculateElapsedTime, 1000);
      return () => clearInterval(interval);
    } else {
      calculateElapsedTime();
    }
  }, [user?.check_in, user?.check_out]);

  return (
    <SafeAreaView className="bg-white">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex flex-col gap-4 p-4">
          <View className="flex flex-row w-full items-center justify-between">
            <Text className="text-red-500 text-ye text-3xl font-extrabold">
              KerjaYuk!
            </Text>
            <Link href="/notification" className="justify-center p-2">
              <View style={{ position: "relative" }}>
                <BellIcon width={24} height={24} color="#000" />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 justify-center items-center">
                    <Text className="text-white text-xs font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </Link>
          </View>
          <View className="flex flex-col gap-2">
            <Text className="text-lg">Hi, Good Morning!</Text>
            <LinearGradient
              colors={["#EF4444", "#db2777"]} // Sama dengan from-red-500 to-red-400
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
              className="w-full p-4 flex flex-col gap-4"
            >
              <View className="flex flex-row justify-between">
                <View className="flex flex-row gap-4">
                  <Image
                    source={{ uri: "https://avatar.iran.liara.run/public/25" }}
                    className="w-10 h-10 rounded-full bg-gray-300"
                  />
                  <View className="flex flex-col items-start">
                    <Text className="text-white text-xl">{user?.name}</Text>
                    <Text className="text-white italic">{user?.position}</Text>
                  </View>
                </View>

                <View className="flex flex-col items-end">
                  <Text className="text-white italic font-thin">
                    Member Since
                  </Text>
                  <Text className="text-white text-xl">
                    {formatDate(user?.join_date ?? "").date}
                  </Text>
                </View>
              </View>
              <View className="flex flex-row items-end justify-between">
                <View className="flex flex-col">
                  <Text className="text-white font-thin">Location</Text>
                  <Text className="text-white font-bold text-lg">
                    {user?.location}
                  </Text>
                </View>
                <Text className="text-white italic font-thin">
                  {user?.role}
                </Text>
              </View>
            </LinearGradient>
          </View>

          <View className="flex flex-col">
            <Text className="text-lg font-bold">Today's activity</Text>
            <View className="flex flex-row p-4 justify-between">
              <Pressable
                onPress={() => dispatch(setCheckIn())}
                disabled={user?.check_in ? true : false}
                className="flex flex-col items-center justify-center gap-1"
              >
                <ClockEightIcon width={36} height={36} color="#ef4444" />
                <Text className="font-bold text-xl">
                  {formatTime(user?.check_in ?? null)}
                </Text>
                <Text className="font-normal text-base">Check In</Text>
              </Pressable>
              <View className="flex flex-col items-center justify-center gap-1">
                <TimerIcon width={36} height={36} color="#ef4444" />
                <Text className="font-bold text-xl text-red-500">
                  {workingHours}
                </Text>
                <Text className="font-normal text-base">Working Hours</Text>
              </View>
              <View className="flex flex-col items-center justify-center gap-1">
                <ClockSixthIcon width={36} height={36} color="#ef4444" />
                <Text className="font-bold text-xl">
                  {formatTime(user?.check_out ?? null)}
                </Text>
                <Text className="font-normal text-base">Check Out</Text>
              </View>
            </View>
          </View>

          <View className="flex flex-col w-full">
            <Text className="text-lg font-bold">PCS News</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              style={{
                padding: 10,
              }}
            >
              <View className="flex flex-row gap-4 p-2">
                {dummyNewsData.map((item) => {
                  return (
                    <View
                      key={item.id}
                      className="flex flex-col gap-4 w-[328px] p-4 bg-white rounded-md"
                      style={{
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 6,
                        elevation: 5,
                      }}
                    >
                      <View className="flex flex-row justify-between w-[300px]">
                        <View className="flex flex-row gap-4 items-center">
                          <Image
                            source={{ uri: item.image_url }}
                            className="w-10 h-10 rounded-full bg-gray-300"
                          />
                          <Text className="text-red-500 font-bold text-lg">
                            {item.name}
                          </Text>
                        </View>

                        <View className="flex flex-col items-end">
                          <Text className="text-sm">
                            {formatDate(item.created_at).day}
                          </Text>
                          <Text className="text-sm">
                            {formatDate(item.created_at).date}
                          </Text>
                        </View>
                      </View>
                      <HTMLView value={item.news} />
                    </View>
                  );
                })}
              </View>
            </ScrollView>
            <View className="flex flex-row justify-center">
              {dummyNewsData.map((_, index) => (
                <View
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    activeIndex === index ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </View>
          </View>

          <View className="flex flex-col gap-2">
            <Text className="text-lg font-bold">Online</Text>
            <View
              className="flex flex-row items-start justify-center bg-white py-2 rounded-md"
              style={{
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
                elevation: 5,
              }}
            >
              {dummyOnlineUsers.slice(0, max_online_user).map((user, index) => (
                <View
                  key={user.id}
                  className={`relative z-20 ${index == 0 ? "ml-0" : "-ml-2.5"}`}
                >
                  <Image
                    source={{ uri: user.image }}
                    className="w-[50px] h-[50px] rounded-full border-2 border-white"
                  />
                  <Text className="text-xs text-center">{user.name}</Text>
                  <Text className="text-xs text-gray-500 text-center">
                    {user.location}
                  </Text>
                </View>
              ))}

              {dummyOnlineUsers.length > max_online_user && (
                <TouchableOpacity className="relative -ml-2.5 z-10">
                  <View className="w-[50px] h-[50px] rounded-full bg-red-600 justify-center items-center border-2 border-white">
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      +{dummyOnlineUsers.length - max_online_user}
                    </Text>
                    <Text className="text-white font-semibold">More</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
