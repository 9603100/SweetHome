import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ReadSendMessage() {
	const token = useSelector((state) => state.token.accessToken);
	const [sendMessageArray, setSendMessageArray] = useState([]);
	const [page, setPage] = useState(0);
	const size = 10;
	const [checkItems, setCheckITems] = useState([]);
	const [pageSize, setPageSize] = useState(0);

	useEffect(() => {
		axios({
			method: "GET",
			url: `${SERVER_URL}/api/messages/send?page=${page}&size=${size}`,
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((res) => {
				setSendMessageArray(res.data.messages);
				setPageSize(res.data.total_page_count);
				console.log(res.data);
				console.log("저장된 값 확인", sendMessageArray);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]);

	const pageUp = () => {
		setPage(page + 1);
	};

	const pageDown = () => {
		setPage(page - 1);
	};

	const changeHandler = (checked, id) => {
		if (checked) {
			setCheckITems([...checkItems, id]);
		} else {
			setCheckITems(checkItems.filter((el) => el !== id));
		}
	};

	function onDeleteMessages(e) {
		const temp = checkItems;
		e.preventDefault();
		axios({
			method: "DELETE",
			url: `${SERVER_URL}/api/messages/send`,
			headers: { Authorization: `Bearer ${token}` },
			data: {
				message_ids: temp,
			},
		}).then((res) => {
			toast.success("메시지 삭제 완료");
			console.log(res);
		});
	}

	function messagePagination() {
		let tempSize = [];
		for (let i = 0; i < pageSize; i++) {
			tempSize.push(<button onClick={changePage}>{i + 1}</button>);
		}

		return tempSize;
	}

	function changePage(e) {
		console.log("체인지페이지", e.target.innerText);
		const chosePage = Number(e.target.innerText) - 1;
		setPage(chosePage);
	}

	return (
		<div>
			<h1>ReadSendMessage</h1>
			<button onClick={onDeleteMessages}>삭제</button>
			<ul>
				{sendMessageArray.map((sendMessage, idx) => (
					<li key={idx}>
						<input
							type="checkbox"
							onChange={(e) => {
								changeHandler(e.currentTarget.checked, sendMessage.message_id);
							}}
							checked={checkItems.includes(sendMessage.message_id) ? true : false}
						/>
						<Link to="/message-box/message-detail" state={{ messageId: sendMessage.message_id }}>
							{sendMessage.message_id}
						</Link>
					</li>
				))}
			</ul>
			<div>
				<button onClick={pageDown}>이전</button>
				{messagePagination()}
				<button onClick={pageUp}>다음</button>
			</div>
		</div>
	);
}

export default ReadSendMessage;
