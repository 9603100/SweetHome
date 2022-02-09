import { useState } from "react";
import axios from "axios";
import errorMessage from "../../store/errorMessage";

function AgreementCreate() {
	const SERVER_URL = process.env.REACT_APP_SERVER_URL;
	const [agreementData, setAgreementData] = useState({
		title: "",
		content: "",
		start_date: "",
		end_date: "",
	});
	const { title, content, start_date, end_date } = agreementData;

	const handleFormSubmit = (e) => {
		e.preventDefault();

		axios({
			url: `${SERVER_URL}/api/admin/agreements`,
			method: "post",
			data: {
				title,
				content,
				start_date: `${start_date}T00:00:00`,
				end_date: `${end_date}T23:59:59`,
			},
		})
			.then(() => {
				setAgreementData({
					title: "",
					content: "",
					start_date: "",
					end_date: "",
				});
			})
			.catch((err) => {
				errorMessage(err.response.data.error_code);
			});
	};

	const handleInputChange = (e) => {
		setAgreementData({ ...agreementData, [e.target.id]: e.target.value });
	};

	return (
		<div>
			<h1>동의서 작성</h1>
			<form>
				<input
					type="text"
					id="title"
					value={title}
					onChange={handleInputChange}
					placeholder="제목을 입력하세요"
				/>
				<label>시작 날짜</label>
				<input type="date" id="start_date" value={start_date} onChange={handleInputChange} />
				<label>종료 날짜</label>
				<input type="date" id="end_date" value={end_date} onChange={handleInputChange} />

				<textarea
					id="content"
					placeholder="동의서 내용을 입력하세요"
					value={content}
					onChange={handleInputChange}
				></textarea>
				<button onClick={handleFormSubmit}>작성</button>
				<button type="button">취소</button>
			</form>
		</div>
	);
}

export default AgreementCreate;