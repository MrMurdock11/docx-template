document.addEventListener("DOMContentLoaded", () => {
	document.querySelector(".button").addEventListener("click", async () => {
		const lastname = document.querySelector(".lastName").value;
		const firstname = document.querySelector(".firstName").value;

		const requestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				lastname,
				firstname,
			})
		}

		const response = await fetch("http://localhost:3000/api/download", requestInit);
		const blob = await response.blob();
		const filename = response.headers.get("Content-Disposition").split("filename=")[1].replace(/"/gm, "");
		const file = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = file;
		a.setAttribute("download", filename);
		
		a.click();
	});
});