import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import style from "style/articles/ArticleCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function ArticleCreateForm({ invertDisabled, boardId, getArticlesAfterCreate }) {
	const user = useSelector((state) => state.userInfo.apt_house);
	const [articleData, setArticleData] = useState({ title: "", content: "" });
	const [imgFile, setImgFile] = useState(null);
	const { title, content } = articleData;

	const handleFormSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append(
			"article",
			new Blob([JSON.stringify(articleData)], { type: "application/json" }),
		);

		imgFile
			? formData.append("image", imgFile)
			: formData.append("image", new Blob([]), { type: "multipart/form-data" });

		console.log(imgFile);
		if (title.trim() && content.trim()) {
			axios({
				url: `${SERVER_URL}/api/apts/${user.apt.apt_id}/boards/${boardId}/articles`,
				method: "post",
				data: formData,
			})
				.then(() => {
					setArticleData({ title: "", content: "" });
					setImgFile({});
					invertDisabled();
					getArticlesAfterCreate();
				})
				.catch((err) => console.log(err.response));
		} else {
			alert("제목과 내용 모두 입력하세요!");
		}
	};

	const handleInputChange = (e) => {
		setArticleData({ ...articleData, [e.target.id]: e.target.value });
	};

	const handleImageChange = (e) => {
		e.preventDefault();
		if (e.target.files && e.target.files[0].size > 200 * 1024 * 1024) {
			alert("200MB 이상의 이미지 파일은 등록할 수 없습니다.");
			e.target.value = null;
			return;
		}
		if (e.target.files) {
			const uploadFile = e.target.files[0];
			setImgFile(uploadFile);
		}
	};

	return (
		<div className={style.opened}>
			<form onSubmit={handleFormSubmit}>
				<input
					type="text"
					id="title"
					value={title}
					onChange={handleInputChange}
					placeholder="제목을 입력하세요"
					className={style.input_text}
				/>

				<textarea
					type="text"
					id="content"
					value={content}
					onChange={handleInputChange}
					placeholder="내용을 입력하세요"
					className={style.textarea}
				/>
				<div className={style.button_box}>
					<div>
						<label htmlFor="file" className={style.file_label}>
							<FontAwesomeIcon icon={faCamera} color="#afafaf" size="lg" />
						</label>
						<input
							type="file"
							id="file"
							className={style.input_file}
							accept="image/*"
							onChange={handleImageChange}
						/>
					</div>
					<div className={style.button_box}>
						<button onClick={invertDisabled} type="button" className={style.outline_btn}>
							취소
						</button>
						<button type="submit">작성</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ArticleCreateForm;
