// src/app/api/strat/route.ts
import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import path from 'path';

// Resolve the correct path to the database
const dbPath = ' C:/Users/jackh/OneDrive/Desktop/stratbook/src/data/stratbook.db'

const db = new Database(dbPath);

export async function GET(request: Request) {
    const url = new URL(request.url);
    const map = url.searchParams.get('map');

  try {
    // Fetch rows from the strat table
    const rows = db.prepare('SELECT * FROM strat, map WHERE map=m_id AND m_id = ?;').all(map);
    
    // Return the data as JSON
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch data from the database' }, { status: 500 });
  }
}

// Handle POST request for adding new data
export async function POST(req: Request) {
    const newStrat = await req.json();
  
    const stmt = db.prepare(
      'INSERT INTO strat (s_name, map, p1, p2, p3, p4, p5) VALUES (?, ?, ?, ?, ?, ?, ?)'
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
    const updatedStrat = await req.json();
  
    // Check if the required fields are present
    if (!updatedStrat.id) {
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }
  
    // Prepare and execute the update statement
    const stmt = db.prepare(
      'UPDATE strat SET s_name = ?, map = ?, p1 = ?, p2 = ?, p3 = ?, p4 = ?, p5 = ? WHERE id = ?'
    );
    const result = stmt.run(
      updatedStrat.s_name,
      updatedStrat.map,
      updatedStrat.p1,
      updatedStrat.p2,
      updatedStrat.p3,
      updatedStrat.p4,
      updatedStrat.p5,
      updatedStrat.id
    );
  
    // If no rows were updated, return an error
    if (result.changes === 0) {
      return NextResponse.json({ error: 'Strat not found or no changes made' }, { status: 404 });
    }
  
    // Return the updated data
    return NextResponse.json({ id: updatedStrat.id, ...updatedStrat });
  }
