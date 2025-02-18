import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setCheckOut } from "@/store/user/userSlice";
import { Text, View } from "react-native";

const Checkout = () => {
  const user = useAppSelector((state) => state.user.user);
  
  // return (
  //   <View>

  //   </View>
  // );
};

export default Checkout;
