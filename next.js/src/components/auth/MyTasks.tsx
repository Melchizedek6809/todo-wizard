"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';

export interface TaskItem {
	id: number;
	title: string;
}

export default function MyTasks() {
	const [tasks, setTasks] = useState([] as TaskItem[]);
	const [newTask, setNewTask] = useState("");

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await fetch('/api/tasks');
				const data = await response.json();
				setTasks(data);
			} catch (error) {
				console.error('Failed to fetch tasks:', error);
			}
		};
		fetchTasks();
	}, []);

	const addTask = async () => {
		if (newTask.trim()) {
			try {
				const response = await fetch('/api/tasks', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ title: newTask }),
				});
				const newTaskData = await response.json();
				setTasks([...tasks, newTaskData]);
				setNewTask("");
			} catch (error) {
				console.error('Failed to add task:', error);
			}
		}
	};

	const removeTask = async (id: number) => {
		try {
			await fetch(`/api/tasks`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ id }),
			});
			setTasks(tasks.filter(task => task.id !== id));
		} catch (error) {
			console.error('Failed to remove task:', error);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault(); // Prevent new line on simple Enter
			addTask();
		}
	};

	const handleTextAreaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = e.target;
		setNewTask(textarea.value);
		
		// Reset height to auto to properly calculate scroll height
		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
				{tasks.length > 0 ? (
					<ul className="space-y-3 mb-6">
						{tasks.map((task) => (
							<li
								key={task.id}
								className="flex justify-between items-start bg-gray-50 p-4 rounded-lg border border-gray-100"
							>
								<div className="prose prose-sm max-w-none flex-grow mr-4">
									<ReactMarkdown remarkPlugins={[remarkGfm]}>
										{task.title}
									</ReactMarkdown>
								</div>
								<button
									onClick={() => removeTask(task.id)}
									className="text-gray-500 hover:text-red-500 transition-colors p-1.5 rounded-md 
										hover:bg-red-50 shrink-0"
									aria-label="Remove task"
								>
									<DeleteOutlineIcon className="w-5 h-5" />
								</button>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-600 text-center py-8 mb-6">
						No tasks yet. Add your first task below!
					</p>
				)}
				
				<div className="flex items-start">
					<textarea
						value={newTask}
						onChange={handleTextAreaInput}
						onKeyDown={handleKeyPress}
						rows={1}
						className="border border-gray-200 rounded-lg p-2.5 mr-2 text-gray-900 flex-grow 
							focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none 
							resize-none overflow-hidden min-h-[42px]"
						placeholder="Add a new task..."
					/>
					<button
						onClick={addTask}
						className="bg-blue-500 text-white px-4 h-[42px] rounded-lg hover:bg-blue-600 
							transition-colors whitespace-nowrap flex items-center gap-1"
					>
						<AddIcon className="w-5 h-5" />
						Add Task
					</button>
				</div>
			</div>
		</div>
	);
}