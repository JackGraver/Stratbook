import React, { useState } from "react";
import "./StratItem.css";

type Strat = {
	s_id: number;
	s_name: string;
	m_id: number;
	m_name: string;
	p1_id: number;
	p1_name: string;
	p1_role: string;
	p2_id: number;
	p2_name: string;
	p2_role: string;
	p3_id: number;
	p3_name: string;
	p3_role: string;
	p4_id: number;
	p4_name: string;
	p4_role: string;
	p5_id: number;
	p5_name: string;
	p5_role: string;
};

interface StratItemProps {
	strat: Strat;
}

const StratItem: React.FC<StratItemProps> = ({ strat }) => {
	const [inputValues, setInputValues] = useState({
		p1_name: strat.p1_name,
		p1_role: strat.p1_role,
		p2_name: strat.p2_name,
		p2_role: strat.p2_role,
		p3_name: strat.p3_name,
		p3_role: strat.p3_role,
		p4_name: strat.p4_name,
		p4_role: strat.p4_role,
		p5_name: strat.p5_name,
		p5_role: strat.p5_role,
	});

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const { name, value } = e.target;
		setInputValues((prevValues) => ({
			...prevValues,
			[`${field}_${name}`]: value,
		}));
	};

	const [successMessage, setSuccessMessage] = useState("");

	const handleSave = async () => {
		try {
			const updatedStrat = {
				...strat,
				p1_name: inputValues.p1_name,
				p1_role: inputValues.p1_role,
				p2_name: inputValues.p2_name,
				p2_role: inputValues.p2_role,
				p3_name: inputValues.p3_name,
				p3_role: inputValues.p3_role,
				p4_name: inputValues.p4_name,
				p4_role: inputValues.p4_role,
				p5_name: inputValues.p5_name,
				p5_role: inputValues.p5_role,
			};
			console.log(updatedStrat);

			const res = await fetch("/api/strat", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedStrat), // Send updated data
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to update strat");
			}

			// Show success message
			setSuccessMessage("Strat updated successfully!");

			// Hide the message after 1 second
			setTimeout(() => {
				setSuccessMessage("");
			}, 5000);
		} catch (err) {
			console.error("Error updating strat:", err);
			setSuccessMessage("Error updating strat");
		}
	};

	const handleDelete = async () => {
		fetch("/api/strat", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ s_id: strat.s_id }), // replace 1 with the actual strat ID
		})
			.then((response) => {
				if (!response.ok) {
					return response.json().then((data) => {
						throw new Error(data.error || "Failed to delete strat");
					});
				}
				return response.json();
			})
			.then((data) => {
				console.log("Success:", data);
				// Optionally: Do something with the response, like update the UI
			})
			.catch((error) => {
				console.error("Error:", error);
				// Optionally: Display error message to the user
			});
	};

	return (
		<div className="strat-item-container">
			<h3>Strat: {strat.s_name}</h3>
			<div className="strat-item">
				<p>Map: {strat.m_name}</p>
				<div>
					<label>
						{inputValues.p1_name}
						<input
							type="text"
							name="role"
							value={inputValues.p1_role}
							onChange={(e) => handleInputChange(e, "p1")}
						/>
					</label>
				</div>
				<div>
					<label>
						{inputValues.p2_name}
						<input
							type="text"
							name="role"
							value={inputValues.p2_role}
							onChange={(e) => handleInputChange(e, "p2")}
						/>
					</label>
				</div>
				<div>
					<label>
						{inputValues.p3_name}
						<input
							type="text"
							name="role"
							value={inputValues.p3_role}
							onChange={(e) => handleInputChange(e, "p3")}
						/>
					</label>
				</div>
				<div>
					<label>
						{inputValues.p4_name}
						<input
							type="text"
							name="role"
							value={inputValues.p4_role}
							onChange={(e) => handleInputChange(e, "p4")}
						/>
					</label>
				</div>
				<div>
					<label>
						{inputValues.p5_name}
						<input
							type="text"
							name="role"
							value={inputValues.p5_role}
							onChange={(e) => handleInputChange(e, "p5")}
						/>
					</label>
				</div>
				<div>
					<button className="save" onClick={handleSave}>
						Save
					</button>
					<button className="delete" onClick={handleDelete}>
						Delete
					</button>
				</div>
				{successMessage && (
					<div className="success-popup">{successMessage}</div>
				)}
			</div>
		</div>
	);
};

export default StratItem;
