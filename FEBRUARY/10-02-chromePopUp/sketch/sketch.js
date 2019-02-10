function setup() {
	noCanvas();
	let userinput = select("#user_input");
	userinput.input(changeTxt);

	function changeTxt() {
		let params = {
			active: true,
			currentWindow: true
		}

		chrome.tabs.query(params, gotTabs);

		function gotTabs(tabs) {
			let txt = userinput.value();
			let msg = {
				txt: txt
			}
			chrome.tabs.sendMessage(tabs[0].id, msg);
		}
	}
}