CREATE DATABASE IF NOT EXISTS apirestgym CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE apirestgym;

CREATE TABLE IF NOT EXISTS workouts (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  mode VARCHAR(100) NOT NULL,
  equipment JSON NOT NULL,
  exercises JSON NOT NULL,
  createdAt VARCHAR(100) NOT NULL,
  updatedAt VARCHAR(100) NOT NULL,
  trainerTips JSON NOT NULL
);

CREATE TABLE IF NOT EXISTS members (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  dateOfBirth VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS records (
  id VARCHAR(64) PRIMARY KEY,
  workout VARCHAR(64) NOT NULL,
  record VARCHAR(255) NOT NULL,
  memberId VARCHAR(64),
  member VARCHAR(255)
);

INSERT IGNORE INTO workouts (id, name, mode, equipment, exercises, createdAt, updatedAt, trainerTips) VALUES
('7f8a12b4-5c91-492e-9821-3a4b9101c121', 'Fran', 'For Time', '["barbell","pull-up bar"]', '["21 thrusters","21 pull-ups","15 thrusters","15 pull-ups","9 thrusters","9 pull-ups"]', '5/10/2022, 10:00:00 AM', '5/10/2022, 10:00:00 AM', '["Aim to complete all sets unbroken","RX Weights: 95lb/65lb","Scale pull-ups to ring rows if needed"]'),
('3b4c81a2-09d4-4f67-8e12-781ab902c342', 'Cindy', 'AMRAP 20', '["pull-up bar"]', '["5 pull-ups","10 push-ups","15 air squats"]', '5/11/2022, 11:30:00 AM', '5/11/2022, 11:30:00 AM', '["Maintain a smooth, continuous pace","Break push-ups early before failure","Aim for 20+ rounds"]'),
('e5d6c7b8-1f2e-43a4-95b6-789012345678', 'Grace', 'For Time', '["barbell"]', '["30 clean and jerks"]', '5/12/2022, 9:15:00 AM', '5/12/2022, 9:15:00 AM', '["RX Weights: 135lb/95lb","Quick singles are a great strategy","Keep back tight during lifts"]'),
('9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d', 'Isabel', 'For Time', '["barbell"]', '["30 snatches"]', '5/13/2022, 2:45:00 PM', '5/13/2022, 2:45:00 PM', '["RX Weights: 135lb/95lb","Power snatches are recommended","Control your breathing between reps"]'),
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Helen', 'For Time', '["kettlebell","pull-up bar"]', '["400m run","21 kettlebell swings","12 pull-ups"]', '5/14/2022, 8:00:00 AM', '5/14/2022, 8:00:00 AM', '["3 rounds for time","RX KB: 53lb/35lb (American style)","Push the pace on the runs"]'),
('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'Diane', 'For Time', '["barbell","wall space"]', '["21 deadlifts","21 handstand push-ups","15 deadlifts","15 handstand push-ups","9 deadlifts","9 handstand push-ups"]', '5/15/2022, 4:20:00 PM', '5/15/2022, 4:20:00 PM', '["RX Weights: 225lb/155lb","Protect your lower back on deadlifts","Scale handstand push-ups to pike push-ups if needed"]'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Jackie', 'For Time', '["rower","barbell","pull-up bar"]', '["1000m row","50 thrusters","30 pull-ups"]', '5/16/2022, 6:00:00 PM', '5/16/2022, 6:00:00 PM', '["RX Weights: 45lb barbell (empty bar)","Pace the row so you can start thrusters immediately","Break thrusters into manageable sets"]'),
('4d5e6f7a-8b9c-0d1e-2f3a-4b5c6d7e8f9a', 'Annie', 'For Time', '["jump rope"]', '["50 double-unders","50 sit-ups","40 double-unders","40 sit-ups","30 double-unders","30 sit-ups","20 double-unders","20 sit-ups","10 double-unders","10 sit-ups"]', '5/17/2022, 7:15:00 AM', '5/17/2022, 7:15:00 AM', '["Scale double-unders to 2x single-unders if needed","Use an AbMat for sit-ups if available","Keep transitions fast"]'),
('5e6f7a8b-9c0d-1e2f-3a4b-5c6d7e8f9a0b', 'Karen', 'For Time', '["medicine ball","wall space"]', '["150 wall-ball shots"]', '5/18/2022, 12:00:00 PM', '5/18/2022, 12:00:00 PM', '["RX Weights: 20lb to 10ft / 14lb to 9ft","Break into sets of 15-20 from the start","Breathe at the top of each rep"]'),
('6f7a8b9c-0d1e-2f3a-4b5c-6d7e8f9a0b1c', 'Nancy', 'For Time', '["barbell"]', '["400m run","15 overhead squats"]', '5/19/2022, 5:30:00 PM', '5/19/2022, 5:30:00 PM', '["5 rounds for time","RX Weights: 95lb/65lb","Keep core tight during overhead squats"]'),
('7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d', 'Elizabeth', 'For Time', '["barbell","rings"]', '["21 cleans","21 ring dips","15 cleans","15 ring dips","9 cleans","9 ring dips"]', '5/20/2022, 9:00:00 AM', '5/20/2022, 9:00:00 AM', '["RX Weights: 135lb/95lb (Squat cleans recommended)","Scale ring dips to box dips or push-ups","Control the descent on dips"]'),
('8b9c0d1e-2f3a-4b5c-6d7e-8f9a0b1c2d3e', 'Eva', 'For Time', '["kettlebell","pull-up bar"]', '["800m run","30 kettlebell swings","30 pull-ups"]', '5/21/2022, 10:45:00 AM', '5/21/2022, 10:45:00 AM', '["5 rounds for time","RX KB: 70lb/53lb (Heavy!)","Pace the 800m run wisely to save grip"]'),
('9c0d1e2f-3a4b-5c6d-7e8f-9a0b1c2d3e4f', 'Kelly', 'For Time', '["plyo box","medicine ball"]', '["400m run","30 box jumps, 24/20 in","30 wall-ball shots"]', '5/22/2022, 3:15:00 PM', '5/22/2022, 3:15:00 PM', '["5 rounds for time","Step down on box jumps to save Achilles","High cardio volume—stay hydrated"]'),
('0d1e2f3a-4b5c-6d7e-8f9a-0b1c2d3e4f5a', 'Lynne', '5 Rounds Max Reps', '["barbell","pull-up bar"]', '["Max bench press (bodyweight)","Max pull-ups"]', '5/23/2022, 1:00:00 PM', '5/23/2022, 1:00:00 PM', '["Rest as needed between rounds","Score is total cumulative reps of both exercises","Use a spotter for bench press"]'),
('1e2f3a4b-5c6d-7e8f-9a0b-1c2d3e4f5a6b', 'Marguerita', 'For Time', '["barbell"]', '["50 burpees","50 overhead squats","50 deadlifts","50 push presses"]', '5/24/2022, 4:00:00 PM', '5/24/2022, 4:00:00 PM', '["RX Weights: 65lb/45lb (Light barbell)","Break movements into small, steady sets of 10","Maintain good form despite fatigue"]'),
('2f3a4b5c-6d7e-8f9a-0b1c-2d3e4f5a6b7c', 'Chief', 'AMRAP 3 x 5', '["barbell"]', '["3 power cleans","6 push-ups","9 air squats"]', '5/25/2022, 8:30:00 AM', '5/25/2022, 8:30:00 AM', '["5 cycles of AMRAP 3 min with 1 min rest between rounds","RX Weights: 135lb/95lb","Sprint each 3-minute block"]'),
('3a4b5c6d-7e8f-9a0b-1c2d-3e4f5a6b7c8d', 'Nasty Girls', 'For Time', '["rings","barbell"]', '["50 air squats","7 ring muscle-ups","10 hang power cleans"]', '5/26/2022, 11:15:00 AM', '5/26/2022, 11:15:00 AM', '["3 rounds for time","RX Weights: 135lb/95lb","Scale muscle-ups to pull-ups + dips"]'),
('4b5c6d7e-8f9a-0b1c-2d3e-4f5a6b7c8d9e', 'Fight Gone Bad', '5 Rounds for Reps', '["rower","wall ball","plyo box","barbell"]', '["1 min wall-ball shots","1 min sumo deadlift high-pulls","1 min box jumps","1 min push presses","1 min calorie row","1 min rest"]', '5/27/2022, 5:00:00 PM', '5/27/2022, 5:00:00 PM', '["3 rounds total (1 min per station)","RX Weights: WB 20/14lb, SDHP 75/55lb, Push Press 75/55lb","Count total reps across all movements"]'),
('5c6d7e8f-9a0b-1c2d-3e4f-5a6b7c8d9e0f', 'Barbell Burner', 'AMRAP 15', '["barbell"]', '["10 power snatches","10 overhead lunges","10 bar-facing burpees"]', '5/28/2022, 9:30:00 AM', '5/28/2022, 9:30:00 AM', '["RX Weights: 95lb/65lb","Keep overhead lunges controlled","Jump over the bar with both feet together on burpees"]'),
('6d7e8f9a-0b1c-2d3e-4f5a-6b7c8d9e0f1a', 'Grip & Core Test', 'EMOM 16', '["kettlebell","pull-up bar"]', '["Min 1: 15 kettlebell swings","Min 2: 12 toes-to-bar","Min 3: 15 Goblet squats","Min 4: Rest"]', '5/29/2022, 2:00:00 PM', '5/29/2022, 2:00:00 PM', '["Repeat sequence for 4 full sets","RX KB: 53lb/35lb","Scale toes-to-bar to knees-to-elbows or hanging leg raises"]');

INSERT IGNORE INTO members (id, name, gender, dateOfBirth, email, password) VALUES
('12a410bc-849f-4e7e-bfc8-4ef283ee4b19', 'Jason Miller', 'male', '23/04/1990', 'jason@mail.com', '$2b$10$0000000000000000000000.fakehashparaejemplo0000000000000000'),
('2dd5a2d0-4fe3-4b2c-8a2a-5a5b8f0d6a11', 'Lisa Jenkins', 'female', '09/12/1998', 'lisa@mail.com', '$2b$10$0000000000000000000000.fakehashparaejemplo0000000000000000');

INSERT IGNORE INTO records (id, workout, record, memberId, member) VALUES
('ad75d475-ac57-44f4-a02a-8f6def58ff56', '61dbae02-c147-4e28-863c-db7bd402b2d6', '160 reps', '12a410bc-849f-4e7e-bfc8-4ef283ee4b19', '/members/12a410bc-849f-4e7e-bfc8-4ef283ee4b19'),
('0d5e1c1d-6a2a-4f1c-9f9e-3b1d7c4e8f02', '4a3d9aaa-608c-49a7-a004-66305ad4ab50', '230 reps', '2dd5a2d0-4fe3-4b2c-8a2a-5a5b8f0d6a11', '/members/2dd5a2d0-4fe3-4b2c-8a2a-5a5b8f0d6a11'),
('3f9c7b6e-1a4d-4c3e-8d2b-7e6a5f4c3b21', 'd8be2362-7b68-4ea4-a1f4-c86c1dc2dc5e', '13:45', '12a410bc-849f-4e7e-bfc8-4ef283ee4b19', '/members/12a410bc-849f-4e7e-bfc8-4ef283ee4b19');
