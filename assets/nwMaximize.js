(function () {
	try{
		require('nw.gui').Window.get().maximize();
	} catch(e){
		// Not running in NW context
	}
})();

