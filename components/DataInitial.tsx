import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setNotifications } from "@/store/notification/notificationSlice";
import { setUser } from "@/store/user/userSlice";

const dummyNotificationData = [
  {
    id: 1,
    type: "Reimbursement",
    status: "paid",
    date: "2025-02-18T14:30:00Z",
    seen: false,
  },
  {
    id: 2,
    type: "Reimbursement",
    status: "rejected",
    date: "2025-02-18T14:30:00Z",
    seen: false,
  },
  {
    id: 3,
    type: "Reimbursement",
    status: "processed",
    date: "2025-02-17T14:30:00Z",
    seen: false,
  },
  {
    id: 4,
    type: "Sickness",
    status: "approved",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
  {
    id: 5,
    type: "Sickness",
    status: "rejected",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
  {
    id: 6,
    type: "Sickness",
    status: "processed",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
  {
    id: 7,
    type: "Overtime",
    status: "approved",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
  {
    id: 8,
    type: "Overtime",
    status: "rejected",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
  {
    id: 9,
    type: "Overtime",
    status: "processed",
    date: "2025-02-01T14:30:00Z",
    seen: false,
  },
];

const userLogin = {
  id: 1,
  name: "Tabay",
  position: "UI/UX Designer",
  join_date: "2025-06-01T14:30:00Z",
  location: "Kantor Sahid",
  role: "ICO",
};

const DataInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNotifications(dummyNotificationData));
    dispatch(setUser(userLogin));
  }, [dispatch]);

  return null;
};

export default DataInitializer;
