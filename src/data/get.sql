SELECT s_id, s_name, m_id, m_name,
         p1.p_id AS p1_id, p1.p_name AS p1_name, p1_role,
         p2.p_id AS p2_id, p2.p_name AS p2_name, p2_role,
         p3.p_id AS p3_id, p3.p_name AS p3_name, p3_role,
         p4.p_id AS p4_id, p4.p_name AS p4_name, p4_role,
         p5.p_id AS p5_id, p5.p_name AS p5_name, p5_role
  FROM strat
  JOIN map ON strat.map = map.m_id  -- Assuming 'map' in strat table links to 'm_id' in map table
  JOIN player p1 ON strat.p1 = p1.p_id
  JOIN player p2 ON strat.p2 = p2.p_id
  JOIN player p3 ON strat.p3 = p3.p_id
  JOIN player p4 ON strat.p4 = p4.p_id
  JOIN player p5 ON strat.p5 = p5.p_id
  WHERE m_id = 1;