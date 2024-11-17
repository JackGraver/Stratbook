// src/app/api/strat/route.ts
import { NextResponse } from "next/server";
import Database from "better-sqlite3";
// import path from 'path';

// Resolve the correct path to the database
const dbPath = " C:/Users/Jack/Desktop/Stratbook/src/data/stratbook.db";

const db = new Database(dbPath);

export async function GET(request: Request) {
	const url = new URL(request.url);
	const map = url.searchParams.get("map");

	try {
		// Fetch rows from the strat table
		const rows = db
			.prepare(
				`SELECT s_id, s_name, m_id, m_name,
                p1.p_id, p1.p_name AS p1_name, p1_role,
                p2.p_id, p2.p_name AS p2_name, p2_role,
                p3.p_id, p3.p_name AS p3_name, p3_role,
                p4.p_id, p4.p_name AS p4_name, p4_role,
                p5.p_id, p5.p_name AS p5_name, p5_role
        FROM strat
        JOIN map ON strat.map = map.m_id  -- Assuming 'map' in strat table links to 'm_id' in map table
        JOIN player p1 ON strat.p1 = p1.p_id
        JOIN player p2 ON strat.p2 = p2.p_id
        JOIN player p3 ON strat.p3 = p3.p_id
        JOIN player p4 ON strat.p4 = p4.p_id
        JOIN player p5 ON strat.p5 = p5.p_id
        WHERE m_id = ?;`
			)
			.all(map);

		// Return the data as JSON
		return NextResponse.json(rows);
	} catch (error) {
		console.error("Database error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch data from the database" },
			{ status: 500 }
		);
	}
}

// Handle POST request for adding new data
export async function POST(req: Request) {
	const newStrat = await req.json();

	const stmt = db.prepare(
		"INSERT INTO strat (s_name, map, p1, p2, p3, p4, p5) VALUES (?, ?, ?, ?, ?, ?, ?)"
	);
	const info = stmt.run(
		newStrat.s_name,
		newStrat.map,
		newStrat.p1,
		newStrat.p2,
		newStrat.p3,
		newStrat.p4,
		newStrat.p5
	);

	return NextResponse.json({ id: info.lastInsertRowid, ...newStrat });
}

// Handle PUT request for updating existing data
export async function PUT(req: Request) {
	try {
		const updatedStrat = await req.json();

		// Ensure ID is provided
		if (!updatedStrat.s_id) {
			return NextResponse.json(
				{ error: "ID is required for update" },
				{ status: 400 }
			);
		}

		const stmt = db.prepare(
			"UPDATE strat SET s_name = ?, map = ?, p1_role = ?, p2_role = ?, p3_role = ?, p4_role = ?, p5_role = ? WHERE s_id = ?"
		);
		const result = stmt.run(
			updatedStrat.s_name,
			updatedStrat.m_id,
			updatedStrat.p1_role,
			updatedStrat.p2_role,
			updatedStrat.p3_role,
			updatedStrat.p4_role,
			updatedStrat.p5_role,
			updatedStrat.s_id
		);

		if (result.changes === 0) {
			return NextResponse.json(
				{ error: "Strat not found or no changes made" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ success: true, strat: updatedStrat });
	} catch (error) {
		console.error("Error during update:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	try {
		// Parse the incoming request body to get the id of the strat to delete
		const { s_id } = await req.json();

		// Check if id is provided
		if (!s_id) {
			return new NextResponse(
				JSON.stringify({ error: "ID is required for deletion" }),
				{ status: 400 }
			);
		}

		// Prepare the delete query
		const stmt = db.prepare("DELETE FROM strat WHERE s_id = ?");
		const result = stmt.run(s_id);

		// If no rows were affected, return an error
		if (result.changes === 0) {
			return new NextResponse(
				JSON.stringify({ error: "Strat not found or already deleted" }),
				{ status: 404 }
			);
		}

		// Return a success response
		return new NextResponse(
			JSON.stringify({ message: "Strat deleted successfully", s_id }),
			{ status: 200 }
		);
	} catch (err) {
		console.error("Error deleting strat:", err);
		return new NextResponse(JSON.stringify({ error: "Error deleting strat" }), {
			status: 500,
		});
	}
}
