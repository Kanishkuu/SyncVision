import { useEffect, useState } from "react";
import axios from "axios";

const useGetConversations = () => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);

	useEffect(() => {
		const getConversations = async () => {
			setLoading(true);
			try {
				const res = await axios.get("/api/users");
				setConversations(res.data);
			} catch (error) {
				console.error(error); 
			} finally {
				setLoading(false);
			}
		};

		getConversations();
	}, []);

	return { loading , conversations };
};

export default useGetConversations;
