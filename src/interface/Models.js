import MakeModels from "./MakeModels.js";
import configs from "../project.config.js";
import index from "./api/index.js";


var Models = {
	...index,
	articleList:{//获取文章列表
		url:'user/article/list'
	},
	articleInfo:{//获取文章详情
		url:'user/article/info'
	},
	temperature:{//体温登记
		url:'user/temperature'
	},
	message:{//求助信息
		url:'user/message'
	}
}

Models = MakeModels.create(Models, {
	requestUrl: configs.requestUrl
})




export default Models
