import { Constant } from "../Util/Constant";


class Flow {

	constructor(configList) {
		//二维数组x:prioroty,y:tasklist.
		this._configList = configList;
		this._taskLists = [];
		this.taskNumber = 0;
		/**
		*  {
		*       gameObject:{
		* 			taskLists:[[$update...],[$lasteUpdate...]],
		*           component:[taskPosition] 
		*       }
		*   }
		* 
		*/
		this._taskMap = new Map();
		this._initTaskLists(this._taskLists);
	};
	_initTaskLists(taskLists) {
		for (let i = 0; i < this._configList.length; i++) {
			taskLists[i] = [];
		}
	};
	//按顺序执行taskt,出现异常打日志，不中断后续任务的执行.
	runTask(callBack) {
		this._runTask(this._taskLists, callBack);
	};
	_runLineTask(list = [], callBack) {
		for (var j = - 1; list[++j];) {
			try {
				list[j](callBack);
			} catch (e) {
				console.error(e);
				console.error(list[j]);
			}
		}
	}
	_runTask(taskLists, callBack) {
		for (let i = -1; taskLists[++i];) {
			this._runLineTask(taskLists[i], callBack);
		}
	};

	_addToTaskLists(taskLists, task, prioroty) {
		if ('function' !== typeof (task)) {
			throw 'Type Error of task !';
		}
		if (isNaN(prioroty)) {
			throw 'Type Error of prioroty !';
		}
		const curentList = taskLists[prioroty];
		const index = curentList.push(task) - 1;
		return { task, prioroty };
	}
	_addTask(task, prioroty) {
		this.taskNumber++;
		return this._addToTaskLists(this._taskLists, task, prioroty);
	};
	_delFromTaskList(taskLists, taskPosition) {
		const { prioroty, task } = taskPosition;
		let curentList = taskLists[prioroty];
		if (curentList) {
			const index = curentList.indexOf(task);
			if (-1 !== index) {
				curentList.splice(index, 1);
				return true;
			}
		}
	}
	_deleteTask(taskPosition) {
		if (this._delFromTaskList(this._taskLists, taskPosition)) {
			this.taskNumber--;
		}
	};
	clearTask() {
		this.taskNumber = 0;
		this._taskLists = [];
		this._taskMap = new Map();
	};
	//需按顺序添加至map中.
	addCompTask(gameObject, component) {

		for (let i = -1; this._configList[++i];) {
			const task = component[this._configList[i]];
			if (task) {
				const taskPosition = this._addTask(task.bind(component), i);
				this._addPosition(gameObject, component, taskPosition);
			}
		}
	};
	_addPosition(gameObject, component, taskPosition) {

		let objTasks = this._taskMap.get(gameObject);
		if (!objTasks) {
			objTasks = new Map();
			this._taskMap.set(gameObject, objTasks);
		}
		let taskLists = objTasks.get(Constant.TASK_LISTS);
		let compTask = objTasks.get(component);
		if (!compTask) {
			compTask = [];
			objTasks.set(component, compTask);
		}
		if (!taskLists) {
			taskLists = [];
			this._initTaskLists(taskLists);
			objTasks.set(Constant.TASK_LISTS, taskLists);
		}
		this._addToTaskLists(taskLists, taskPosition.task, taskPosition.prioroty);
		compTask.push(taskPosition);
	}
	_delPosition(gameObject, component, taskPosition) {
		const taskLists = this._taskMap.get(gameObject).get(Constant.TASK_LISTS);
		this._delFromTaskList(taskLists, taskPosition);
	};
	// addObjTask(gameObject){

	// };
	delCompTask(gameObject, component) {
		const objTask = this._taskMap.get(gameObject);
		const taskPositions = objTask.get(component);
		for (let i = -1; taskPositions[++i];) {
			this._deleteTask(taskPositions[i]);
			this._delPosition(gameObject, component, taskPositions[i]);
		}
		objTask.delete(component);

	};
	delObjTask(gameObject) {
		const comps = gameObject.getComponents();
		for (let i = -1; comps[++i];) {
			this.delCompTask(gameObject, comps[i]);
		}
		this._taskMap.delete(gameObject);
	};
	runComptask(gameObject, component) {
		const taskPositions = this._taskMap.get(gameObject).get(component);
		for (let i = -1; taskPositions[++i];) {
			taskPositions[i].task();
		}
	};
	runObjectTask(gameObject) {
		const taskLists = this._taskMap.get(gameObject).get(Constant.TASK_LISTS);
		this._runTask(taskLists);
	};
	runObjPrioTask(gameObject, prioroty) {
		const tasks = this._taskMap.get(gameObject).get(Constant.TASK_LISTS)[prioroty];
		this._runLineTask(tasks);
	};
}
export { Flow };
