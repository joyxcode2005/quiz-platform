import type { MatchScore, Track, PlayerScore } from '../types';

// Helper functions to heavily compress the data file size.
// m() is variadic on purpose: FLQL/Flames games pass 4 entrants, Smashdown
// games pass 3 (each a 2-person team) - same shape, different roster size.
const m = (matchId: string, track: Track, ...players: PlayerScore[]): MatchScore => ({
  matchId, track, players
});
const p = (name: string, pts: number, bas: number, qelo: number): PlayerScore => ({ name, pts, bas, qelo });

export const weeklyMatches: Record<number, MatchScore[]> = {
  // ==========================================
  // GAMEWEEK 1 SCORES
  // ==========================================
  1: [
    // --- INDIA TRACK (GW1) ---
    m('1101', 'india', p('Varun P D', 11, 8, 27.2), p('Soumyadipta Chanda', 9, 12, 22.3), p('Kapinjal Kishore Sharma', 8, 6, 19.8), p('V.V.Sivakumar', 19, 11, 47.0)),
    m('1102', 'india', p('Venkatesh Srinivasan', 15, 12, 43.0), p('Diptojyoti Das Purkayastha', 15, 12, 43.0), p('Poorvaja Prakash', 0, 0, 1.0), p('Shayak Ray', 0, 0, 1.0)),
    m('1103', 'india', p('Reeva Chitkara', 11, 15, 31.6), p('Vineet V', 10, 12, 28.8), p('Vansh Vardhan Singh', 9, 15, 25.9), p('Diwakar B', 16, 15, 46.0)),
    m('1104', 'india', p('Srikrishna Sriram', 8, 12, 16.8), p('Namratha', 13, 12, 27.4), p('Alanckrit Jain', 0, 0, 1.0), p('Rahul Buddhavarapu', 19, 13, 40.0)),
    m('1105', 'india', p('Waqar Moid', 8, 9, 20.9), p('Keshav Athreya', 18, 9, 47.0), p('Nikhil George', 12, 8, 31.3), p('Rahul Jadhav', 9, 7, 23.5)),
    m('1106', 'india', p('Anshuman Pal', 13, 8, 35.4), p('Dhruv Mookerji', 18, 9, 49.0), p('Aravind', 10, 6, 27.2), p('Akash Patil', 8, 6, 21.8)),
    m('1107', 'india', p('Mohammed Kaif', 4, 9, 11.5), p('Kartik Maheshwari', 10, 9, 28.7), p('P Rajesh', 15, 12, 43.0), p('Wrichik Basu', 14, 12, 40.1)),
    m('1108', 'india', p('Shramanth', 9, 6, 21.5), p('Mayank Choudhary', 6, 6, 15.0), p('Appu S', 16, 9, 38.2), p('Venkatraghavan S', 18, 12, 43.0)),
    m('1109', 'india', p('Pranav Bontadkar', 11, 11, 27.8), p('Apratim Mukhopadhyay', 19, 12, 48.0), p('Arpit Solanki', 0, 0, 0.0), p('Saurabh Patel', 18, 11, 45.5)),
    m('1110', 'india', p('Sudhir Pai', 0, 0, 1.0), p('Rupi Mody', 0, 0, 1.0), p('Sanat Pai Raikar', 25, 18, 44.0), p('Roshith Mohan', 19, 16, 33.4)),
    m('1111', 'india', p('Priyanka', 12, 7, 34.0), p('Mit Chowdhury', 10, 10, 28.3), p('Nikhil Dubey', 11, 10, 31.2), p('Kunal Roy', 18, 10, 51.0)),
    m('1112', 'india', p('AjayKrishna Jayaram', 13, 11, 34.0), p('Francis Rodrigues', 12, 15, 31.4), p('Dhruv Nath', 9, 13, 23.5), p('Ramesh Natarajan', 0, 0, 1.0)),
    m('1113', 'india', p('Ashwin Balasubramaniam', 11, 10, 36.0), p('Anil Raghavan', 11, 18, 36.0), p('Sumeet', 7, 12, 22.9), p('Sumit Kumar Das', 7, 9, 22.9)),
    m('1114', 'india', p('Ramakrishnan R', 6, 11, 17.6), p('Vansh Uppal', 14, 11, 41.0), p('Tuhin', 11, 12, 32.2), p('Devesh Vashishtha', 10, 11, 29.3)),
    m('1115', 'india', p('Aniruddha Kasyap', 4, 9, 10.1), p('Ashvini Natu', 12, 10, 30.4), p('Ankita Mukherji', 17, 8, 43.0), p('Nirad Inamdar', 10, 7, 25.3)),
    m('1116', 'india', p('Vinod Hariharan', 13, 12, 30.0), p('Kaushik Chatterji', 16, 12, 43.3), p('Debanjan Mahapatra', 17, 12, 46.0), p('Aditi Jain', 13, 10, 35.2)),
    m('1117', 'india', p('Rishabh Gogoi', 12, 7, 42.5), p('Bishanka Dassarma', 13, 7, 46.0), p('Pankaj Parashar', 8, 7, 28.3), p('Sumantrasarathi Datta', 13, 8, 46.0)),
    m('1118', 'india', p('Samir Gupta', 13, 11, 43.0), p('Jitaditya Narzary', 12, 10, 39.7), p('Krishnan S', 13, 10, 43.0), p('Harit Jain', 5, 11, 16.5)),
    m('1119', 'india', p('Sandipan Goswami', 19, 11, 49.0), p('R Rangaraj', 6, 7, 15.5), p('Yuthish', 10, 7, 25.8), p('Harish Alagappa', 14, 9, 36.1)),
    m('1120', 'india', p('Shashank Prabhakar', 12, 16, 31.8), p('Santonab Chakraborty', 17, 15, 45.0), p('Rajdeep Chakraborty', 3, 9, 7.9), p('Srinivasan Rengarajan', 13, 11, 34.4)),
    m('1121', 'india', p('Anand Sivashankar', 13, 7, 42.1), p('Suvajit Chakraborty', 15, 9, 48.5), p('Raja Sri Charan', 17, 8, 55.0), p('Shom Biswas', 10, 6, 32.4)),
    m('1122', 'india', p('Rishav Dewan', 12, 10, 29.6), p('Arpita Shetty', 15, 10, 37.0), p('Kuldeep Singh Chandi', 10, 7, 24.7), p('Shubhendu Saha', 0, 0, 1.0)),
    m('1123', 'india', p('Gregory Thurkadayil', 9, 6, 24.5), p('Apratim "Belur"', 16, 10, 43.6), p('Aswath Venkataraman', 18, 9, 49.0), p('Vibhu Prakash', 6, 5, 16.3)),
    m('1124', 'india', p('Divij Santosh', 7, 9, 16.9), p('Rathindra Basu', 10, 15, 24.1), p('J Krishnamurthi', 17, 14, 41.0), p('Abhijit Anand', 7, 7, 16.9)),
    m('1125', 'india', p('Arun T P', 14, 10, 42.0), p('Gazal Akbar', 4, 7, 12.0), p('Sreekanth RP', 16, 10, 48.0), p('Rajdeep Dasgupta', 14, 11, 42.0)),
    m('1126', 'india', p('Yash Vardhan Thirani', 8, 6, 13.4), p('Gautam Ghosh', 9, 6, 25.3), p('Subrat Mohanty', 34, 25, 57.0), p('Abhijith Bhadran', 15, 12, 25.1)),
    m('1127', 'india', p('Naveen Giles', 19, 20, 37.0), p('Asad Husain', 0, 0, 1.0), p('Aritra Chatterjee', 0, 0, 1.0), p('Sourav Das', 18, 20, 35.1)),
    m('1128', 'india', p('Arjun Some', 12, 6, 34.5), p('Samanth Subramanian', 16, 8, 46.0), p('Chandramouleeswaran Baskaran', 11, 7, 31.6), p('Naman Maheshwari', 7, 8, 20.1)),
    m('1129', 'india', p('Aniket Mitra', 17, 17, 35.0), p('Samir Husain', 12, 10, 24.7), p('Eesh Gujrania', 0, 0, 0.0), p('Shilpa Vijay', 6, 10, 12.4)),

    // --- INTL TRACK (GW1) ---
    m('1001', 'intl', p('Madhavi Das', 12, 8, 42.0), p('Dibyo Haldar', 13, 5, 45.5), p('Alokita Basu', 10, 4, 35.0), p('Aabhaas Dasgupta', 14, 6, 49.0)),
    m('1002', 'intl', p('Swetha Sridhar', 17, 9, 46.5), p('Diya', 10, 8, 27.4), p('Gayatri Verma', 19, 9, 52.0), p('Vidit Uppal', 6, 4, 16.4)),
    m('1003', 'intl', p('Ajit Nayak', 20, 11, 55.0), p('Athreyan Sundararajan', 18, 10, 49.5), p('Anuradha Santhanam', 17, 11, 46.8), p('Aditya H Iyer', 0, 0, 1.0)),
    m('1004', 'intl', p('Sanveer Singh Puri', 8, 11, 14.5), p('Aishwarya Subramanian', 27, 19, 49.0), p('Ashish Saligram', 14, 15, 25.4), p('Mayuresh Gadge', 0, 0, 1.0)),
    m('1005', 'intl', p('Anuradha Dharwadkar', 10, 7, 32.9), p('Nandakrishna Kesavapuram', 11, 9, 36.1), p('Pranjal Jharkharia', 14, 8, 46.0), p('Raghav', 11, 6, 36.1)),
    m('1006', 'intl', p('Shubhankar Gokhale', 12, 4, 40.0), p('Pranjal Agrawal', 15, 5, 50.0), p('Samrat Sengupta', 11, 5, 36.7), p('Riddhi Shah', 12, 7, 40.0)),
    m('1007', 'intl', p('Anannya Deb', 12, 6, 46.3), p('Raja Balasubramanian', 14, 4, 54.0), p('Ashish Saksena', 14, 6, 54.0), p('Chaitanya Hegde', 14, 6, 54.0)),
    m('1008', 'intl', p('Rohan Nagpal', 9, 6, 28.7), p('Suhas', 11, 9, 35.1), p('Vinod Sivarama Krishnan', 16, 10, 51.0), p('Shankha Ghosh Dastidar', 15, 8, 47.8)),
    m('1009', 'intl', p('Ayush Sharma', 30, 24, 38.0), p('Abhishek Paul', 0, 0, 1.0), p('Christy Varghese', 0, 0, 1.0), p('Huang Yi', 8, 9, 10.1)),
    m('1010', 'intl', p('Sameer Khan', 9, 12, 18.3), p('Raamanujan', 18, 10, 36.7), p('Nikhil Arora', 0, 0, 1.0), p('Nikhil Soneja', 26, 17, 53.0)),
    m('1011', 'intl', p('Santosh Swaminathan', 24, 11, 60.0), p('EMPTY', 0, 0, 1.0), p('Kiran kalyan', 12, 5, 30.0), p('Aditya Pal', 18, 9, 45.0)),
    m('1012', 'intl', p('Manu Bhardwaj', 16, 11, 42.1), p('Vincenzo Tagle', 19, 10, 50.0), p('Sushant', 15, 12, 39.5), p('Roma Pandya', 0, 0, 1.0)),
    m('1013', 'intl', p('Glenn Tuazon', 13, 6, 39.7), p('Varun Rajiv', 19, 6, 58.0), p('Sujit Ray', 13, 5, 39.7), p('Abhinav Dasgupta', 13, 5, 39.7)),
    m('1014', 'intl', p('Vignesh Ramanathan', 9, 3, 30.6), p('Sayak Dasgupta', 14, 8, 47.6), p('Ishaan Nejeeb', 15, 7, 51.0), p('Saransh Mohapatra', 13, 6, 44.2)),
    m('1015', 'intl', p('Mihir Jayaraman', 11, 6, 29.9), p('Gandharvraj Gwalani', 9, 9, 24.5), p('Dhruv Agarwal', 11, 7, 29.9), p('Shruthi', 18, 10, 49.0)),
    m('1016', 'intl', p('Rohan Mitra', 9, 6, 22.3), p('Shakeel Imdad', 12, 10, 29.7), p('Vinoo S', 21, 13, 52.0), p('Debjit Tripathy', 10, 6, 24.8)),
    m('1017', 'intl', p('Wes Kington', 11, 6, 38.1), p('Mick Logue', 15, 6, 52.0), p('Rohan Williams', 12, 5, 41.6), p('Bevan Thulkanam', 14, 5, 48.5)),
    m('1018', 'intl', p('Saahil Sharma', 11, 5, 37.1), p('David Howse', 16, 5, 54.0), p('Aaran Mohann', 14, 5, 47.3), p('Pravin Varma', 13, 4, 43.9)),
    m('1019', 'intl', p('Malte Dürr', 9, 3, 21.1), p('Prakhar Gupta', 12, 4, 28.2), p('Abel', 10, 3, 23.5), p('Pat Gibson', 23, 9, 54.0)),
    m('1020', 'intl', p('Sudip Roy', 0, 0, 1.0), p('Raunaq Vohra', 18, 13, 35.1), p('Timothy Short', 0, 0, 1.0), p('Lukas Prießnitz', 19, 12, 37.0)),
    m('1021', 'intl', p('Dave McBryan', 13, 3, 38.3), p('Seoan Webb', 19, 7, 56.0), p('Shanine Salmon', 10, 2, 29.5), p('Mikey Brown', 14, 6, 41.3)),
    m('1022', 'intl', p('Jonny Coral', 11, 6, 30.3), p('Dan O\'Malley', 20, 8, 55.0), p('Chandrakala Geddapu', 8, 2, 22.0), p('Kristian Kvamsøe', 16, 7, 44.0)),
    m('1023', 'intl', p('John McKenzie', 12, 10, 29.6), p('Andy Christley', 13, 10, 32.1), p('Scott Vaughan', 17, 12, 42.0), p('Sushmita Azad', 0, 0, 1.0)),
    m('1024', 'intl', p('Debashree Bhattacharya', 0, 0, 1.0), p('Vishal Palla', 10, 8, 24.7), p('Sree Kanthamneni', 17, 11, 42.0), p('Alexandra Muller', 15, 8, 37.1)),
    m('1025', 'intl', p('Richard Appleyard', 11, 5, 38.9), p('Devrim Aslan', 13, 6, 46.0), p('Ailsa Watson', 10, 4, 35.4), p('Piyush Singh', 12, 8, 42.5)),
    m('1026', 'intl', p('Lewis Jones', 17, 6, 54.0), p('Ann Gavaghan', 17, 5, 54.0), p('Rohan Walyat', 10, 5, 31.8), p('Gokulan Valavan', 10, 5, 31.8)),
    m('1027', 'intl', p('Manjula Jonnalagadda', 9, 4, 33.0), p('akshat jain', 12, 6, 44.0), p('Alok Kulkarni', 12, 5, 44.0), p('Vishal Chandra', 11, 7, 40.3)),
    m('1028', 'intl', p('Parvati Abdulpurkar', 3, 0, 8.8), p('Stan Park', 15, 4, 44.1), p('Jomy Alappattu', 16, 6, 47.0), p('Sheethal', 13, 4, 38.2)),
    m('1029', 'intl', p('Harish Swaminathan', 15, 7, 44.1), p('John Liu', 16, 5, 47.0), p('Anmol Singh', 11, 6, 32.3), p('Param Nagda', 5, 1, 14.7)),
    m('1030', 'intl', p('Shreyas Padmanabhan', 21, 15, 46.0), p('Sanjay Kadaveru', 10, 8, 21.9), p('Vinay Sridhar', 15, 9, 32.9), p('Ramprakash Balasubramani', 0, 0, 1.0)),
    m('1031', 'intl', p('Armand Sanchez', 9, 4, 29.3), p('Drew Scheeler', 16, 5, 52.0), p('Kelsey Barcomb', 11, 2, 35.8), p('Randall Eng', 16, 7, 52.0)),
    m('1032', 'intl', p('Ishan Kaul', 5, 8, 12.5), p('Rishi Rajasekaran', 12, 9, 30.0), p('Peter Sells', 13, 9, 32.5), p('Graig Zethner', 20, 10, 50.0)),
    m('1033', 'intl', p('rohan naidu', 13, 9, 42.7), p('Vallabh Vasudevan', 14, 7, 46.0), p('Paddy Narasimha Murthy', 5, 6, 16.4), p('Abhinav Mouli', 14, 8, 46.0)),
    m('1034', 'intl', p('Gautam Dambekodi', 9, 5, 32.1), p('Nancy Robertson', 14, 7, 50.0), p('Jeffrey Seguritan', 14, 6, 50.0), p('Sudarshan Aji', 13, 6, 46.4)),
    m('1035', 'intl', p('Paul Poovakulam', 17, 7, 50.1), p('Sandeep Hari', 12, 7, 35.3), p('veronica vichit-vadakan', 18, 8, 53.0), p('Sid Grover', 6, 3, 17.7)),
    m('1036', 'intl', p('Jayanthi Srinivasan', 13, 4, 48.5), p('Choyon Manjrekar', 15, 4, 56.0), p('Simon McAndrews', 15, 5, 56.0), p('Shyam Shreyas', 13, 5, 48.5)),
    m('1037', 'intl', p('Joshua Davey', 21, 13, 50.0), p('Namita Jane itty', 11, 13, 26.2), p('Krishnamurthy Viswanathan', 18, 12, 42.9), p('EMPTY', 0, 0, 0.0)),
    m('1038', 'intl', p('Alind Chandra', 15, 7, 42.1), p('Susannah Brooks', 21, 8, 59.0), p('Priyank Mehta', 14, 7, 39.3), p('Gautam Ghosh', 9, 6, 25.3)),
    m('1039', 'intl', p('Reitesh Raman', 16, 10, 39.6), p('Anupama Srirangan', 21, 11, 52.0), p('Rohan Rodrigues', 15, 10, 37.1), p('EMPTY', 0, 0, 0.0)),
  ],

  // ==========================================
  // GAMEWEEK 2 SCORES
  // ==========================================
  2: [
    // --- INDIA TRACK (GW2) ---
    m('2101', 'india', p('Aniket Mitra', 10, 10, 28.3), p('Sreekanth RP', 18, 10, 51.0), p('Ashwin Balasubramaniam', 16, 9, 45.3), p('Krishnan S', 7, 6, 19.8)),
    m('2102', 'india', p('Saurabh Patel', 11, 9, 27.5), p('Samanth Subramanian', 22, 12, 55.0), p('Anil Raghavan', 10, 9, 25.0), p('Diwakar B', 12, 10, 30.0)),
    m('2103', 'india', p('AjayKrishna Jayaram', 4, 3, 12.0), p('Arpita Shetty', 12, 8, 36.0), p('Naveen Giles', 14, 8, 42.0), p('J Krishnamurthi', 15, 8, 45.0)),
    m('2104', 'india', p('Raja Sri Charan', 10, 6, 31.7), p('Kunal Roy', 14, 7, 44.4), p('Venkatraghavan S', 13, 7, 41.2), p('Aswath Venkataraman', 17, 7, 54.0)),
    m('2105', 'india', p('Santonab Chakraborty', 15, 7, 51.0), p('Suvajit Chakraborty', 10, 5, 34.0), p('Subrat Mohanty', 14, 8, 47.6), p('Apratim Belur', 12, 7, 40.8)),
    m('2106', 'india', p('Samir Gupta', 16, 11, 48.0), p('Diptojyoti Das Purkayastha', 10, 8, 30.0), p('Rahul Buddhavarapu', 12, 6, 36.0), p('Sumantrasarathi Datta', 10, 6, 30.0)),
    m('2107', 'india', p('Sandipan Goswami', 18, 15, 50.0), p('Ankita Mukherji', 0, 0, 1.0), p('Bishanka Dassarma', 16, 13, 44.4), p('Venkatesh Srinivasan', 16, 12, 44.4)),
    m('2108', 'india', p('V.V.Sivakumar', 12, 9, 35.2), p('Apratim Mukhopadhyay', 16, 8, 47.0), p('Vansh Uppal', 5, 5, 14.7), p('Sanat Pai Raikar', 17, 9, 50.0)),
    m('2109', 'india', p('P Rajesh', 11, 4, 34.2), p('Dhruv Mookerji', 18, 8, 56.0), p('Keshav Athreya', 18, 7, 56.0), p('Debanjan Mahapatra', 9, 4, 28.0)),
    m('2110', 'india', p('Kartik Maheshwari', 9, 4, 28.0), p('Shashank Prabhakar', 8, 2, 24.8), p('Srinivasan Rengarajan', 5, 8, 15.5), p('Srikrishna Sriram', 6, 4, 18.6)),
    m('2111', 'india', p('Nikhil Dubey', 11, 14, 31.4), p('Reeva Chitkara', 7, 12, 20.0), p('Rathindra Basu', 14, 14, 40.0), p('Rahul Jadhav', 8, 10, 22.8)),
    m('2112', 'india', p('Kaushik Chatterji', 16, 16, 41.0), p('Jitaditya Narzary', 13, 13, 33.3), p('Aravind', 12, 13, 30.7), p('Aditi Jain', 0, 0, 1.0)),
    m('2113', 'india', p('Appu S', 13, 11, 33.0), p('Arjun Some', 9, 11, 22.8), p('Samir Husain', 0, 0, 1.0), p('Nirad Inamdar', 11, 12, 27.9)),
    m('2114', 'india', p('Wrichik Basu', 24, 21, 43.0), p('Vineet V', 4, 10, 7.1), p('Namratha', 8, 13, 14.3), p('Dhruv Nath', 7, 12, 12.5)),
    m('2115', 'india', p('Rishav Dewan', 10, 9, 36.9), p('Kuldeep Singh Chandi', 12, 8, 44.3), p('Varun P D', 13, 7, 48.0), p('Rajdeep Dasgupta', 13, 9, 48.0)),
    m('2117', 'india', p('Rishabh Gogoi', 12, 6, 30.7), p('Yuthish', 6, 3, 15.3), p('Chandramouleeswaran Baskaran', 7, 6, 17.9), p('Ashvini Natu', 16, 10, 41.0)),
    m('2118', 'india', p('Anshuman Pal', 17, 16, 40.2), p('Roshith Mohan', 19, 12, 45.0), p('Shramanth', 0, 0, 1.0), p('Soumyadipta Chanda', 9, 12, 21.3)),
    m('2119', 'india', p('Francis Rodrigues', 15, 9, 44.0), p('Sourav Das', 12, 8, 35.2), p('Abhijith Bhadran', 11, 8, 32.2), p('Gregory Thurkadayil', 6, 8, 17.6)),
    m('2120', 'india', p('Devesh Vashishtha', 4, 9, 9.6), p('Priyanka', 14, 12, 33.6), p('Nikhil George', 15, 11, 36.0), p('Pranav Bontadkar', 3, 8, 7.2)),
    m('2121', 'india', p('Ramesh Natarajan', 26, 27, 32.0), p('Shayak Ray', 0, 0, 1.0), p('Eesh Gujrania', 0, 0, 1.0), p('Akash Patil', 6, 11, 7.3)),
    m('2122', 'india', p('Poorvaja Prakash', 8, 8, 20.0), p('Waqar Moid', 14, 11, 35.0), p('Mohammed Kaif', 3, 8, 7.5), p('Aritra Chatterjee', 10, 7, 25.0)),
    m('2123', 'india', p('Naman Maheshwari', 8, 18, 16.0), p('Ramakrishnan R', 8, 18, 16.0), p('EMPTY', 0, 0, 1.0), p('Gazal Akbar', 0, 0, 1.0)),
    m('2124', 'india', p('Yash Vardhan Thirani', 7, 8, 20.4), p('Abhijit Anand', 11, 8, 32.1), p('Sumeet', 7, 10, 20.4), p('Sudhir Pai', 13, 10, 38.0)),
    m('2125', 'india', p('Mit Chowdhury', 11, 16, 29.0), p('R Rangaraj', 8, 12, 21.1), p('Shilpa Vijay', 4, 5, 10.5), p('Kapinjal Kishore Sharma', 14, 15, 37.0)),
    m('2126', 'india', p('Rajdeep Chakraborty', 0, 0, 1.0), p('Gautam Ghosh', 25, 19, 34.0), p('Asad Husain', 5, 8, 6.8), p('Divij Santosh', 4, 9, 5.4)),
    m('2127', 'india', p('Vinod Hariharan', 22, 31, 33.0), p('Shom Biswas', 0, 0, 1.0), p('Pankaj Parashar', 7, 13, 10.5), p('Vansh Vardhan Singh', 4, 15, 6.0)),
    m('2128', 'india', p('Rupi Mody', 2, 6, 5.3), p('Tuhin', 9, 8, 24.0), p('Vibhu Prakash', 7, 6, 18.6), p('Alanckrit Jain', 6, 12, 16.0)),
    m('2129', 'india', p('Aniruddha Kasyap', 7, 8, 11.6), p('EMPTY', 0, 0, 1.0), p('Shubhendu Saha', 18, 12, 30.0), p('Sumit Kumar Das', 5, 6, 8.3)),

    // --- INTL TRACK (GW2) ---
    m('2001', 'intl', p('Santosh Swaminathan', 14, 4, 48.5), p('Varun Rajiv', 17, 4, 59.0), p('Ajit Nayak', 13, 4, 45.1), p('David Howse', 15, 4, 52.0)),
    m('2002', 'intl', p('Nikhil Soneja', 16, 7, 54.0), p('Vinoo S', 15, 5, 50.6), p('Gayatri Verma', 10, 3, 33.7), p('Mick Logue', 13, 4, 43.8)),
    m('2003', 'intl', p('Vinod Sivarama Krishnan', 17, 7, 57.0), p('Ishaan Nejeeb', 7, 2, 23.4), p('Vincenzo Tagle', 17, 7, 57.0), p('Pranjal Agrawal', 16, 7, 53.6)),
    m('2004', 'intl', p('Aishwarya Subramanian', 19, 13, 49.0), p('Shruthi', 14, 12, 36.1), p('Aabhaas Dasgupta', 16, 11, 41.2), p('Pranjal Jharkharia', 0, 0, 1.0)),
    m('2005', 'intl', p('Ann Gavaghan', 11, 3, 39.4), p('Dan O\'Malley', 16, 3, 57.4), p('Pat Gibson', 17, 4, 61.0), p('Seoan Webb', 17, 4, 61.0)),
    m('2006', 'intl', p('Devrim Aslan', 13, 3, 43.8), p('Lewis Jones', 16, 4, 54.0), p('Scott Vaughan', 13, 3, 43.8), p('Sree Kanthamneni', 12, 4, 40.5)),
    m('2007', 'intl', p('Anupama Srirangan', 11, 5, 39.8), p('Graig Zethner', 16, 4, 58.0), p('Joshua Davey', 16, 5, 58.0), p('John Liu', 15, 5, 54.3)),
    m('2008', 'intl', p('Jomy Alappattu', 14, 5, 46.1), p('Shreyas Padmanabhan', 10, 3, 32.9), p('Choyon Manjrekar', 17, 6, 56.0), p('Drew Scheeler', 15, 4, 49.4)),
    m('2009', 'intl', p('Abhinav Mouli', 9, 3, 29.5), p('Jeffrey Seguritan', 16, 5, 52.4), p('Simon McAndrews', 18, 5, 59.0), p('akshat jain', 16, 7, 52.4)),
    m('2010', 'intl', p('Alok Kulkarni', 13, 7, 34.6), p('Nancy Robertson', 12, 7, 32.0), p('Randall Eng', 21, 8, 56.0), p('Vallabh Vasudevan', 10, 7, 26.6)),
    m('2011', 'intl', p('Ayush Sharma', 13, 4, 45.5), p('Lukas Prießnitz', 14, 4, 49.0), p('Susannah Brooks', 13, 4, 45.5), p('veronica vichit-vadakan', 16, 6, 56.0)),
    m('2012', 'intl', p('Ashish Saksena', 15, 10, 45.8), p('Sayak Dasgupta', 13, 7, 39.7), p('Athreyan Sundararajan', 7, 4, 21.4), p('Shankha Ghosh Dastidar', 17, 7, 52.0)),
    m('2013', 'intl', p('Chaitanya Hegde', 21, 16, 45.0), p('Huang Yi', 10, 13, 21.4), p('Swetha Sridhar', 0, 0, 1.0), p('Ramprakash Balasubramani', 14, 16, 30.0)),
    m('2014', 'intl', p('Raja Balasubramanian', 10, 9, 23.3), p('Raamanujan', 21, 13, 49.0), p('Riddhi Shah', 8, 10, 18.6), p('Shubhankar Gokhale', 10, 5, 23.3)),
    m('2015', 'intl', p('Manu Bhardwaj', 11, 9, 28.1), p('Nandakrishna Kesavapuram', 18, 8, 46.0), p('Dhruv Agarwal', 8, 6, 20.4), p('Mihir Jayaraman', 9, 10, 23.0)),
    m('2016', 'intl', p('Dibyo Haldar', 12, 8, 32.8), p('Aditya Pal', 19, 8, 52.0), p('Raghav', 11, 5, 30.1), p('Shakeel Imdad', 10, 5, 27.3)),
    m('2017', 'intl', p('Paul Poovakulam', 12, 4, 42.0), p('Harish Swaminathan', 12, 4, 42.0), p('Stan Park', 16, 6, 56.0), p('Krishnamurthy Viswanathan', 16, 6, 56.0)),
    m('2018', 'intl', p('Alind Chandra', 14, 9, 50.4), p('Reitesh Raman', 15, 8, 54.0), p('Vinay Sridhar', 14, 8, 50.4), p('Peter Sells', 11, 7, 39.6)),
    m('2019', 'intl', p('Kristian Kvamsøe', 19, 7, 56.0), p('Piyush Singh', 14, 6, 41.2), p('Alexandra Muller', 11, 6, 32.4), p('Raunaq Vohra', 12, 6, 35.3)),
    m('2020', 'intl', p('Mikey Brown', 16, 4, 44.8), p('Andy Christley', 8, 1, 22.4), p('Bevan Thulkanam', 12, 6, 33.6), p('Aaran Mohann', 20, 9, 56.0)),
    m('2021', 'intl', p('Prakhar Gupta', 20, 9, 50.4), p('Dave McBryan', 23, 9, 58.0), p('Jonny Coral', 15, 8, 37.8), p('Debashree Bhattacharya', 0, 0, 1.0)),
    m('2022', 'intl', p('Richard Appleyard', 17, 6, 50.0), p('Mansi Sood', 10, 5, 29.4), p('Shanine Salmon', 13, 6, 38.2), p('Vishal Palla', 10, 6, 29.4)),
    m('2023', 'intl', p('John McKenzie', 7, 9, 16.4), p('Abel', 22, 13, 51.6), p('Ailsa Watson', 23, 13, 54.0), p('Timothy Short', 2, 3, 4.7)),
    m('2024', 'intl', p('Chandrakala Geddapu', 8, 8, 21.0), p('Malte Dürr', 16, 9, 42.0), p('Sushmita Azad', 7, 8, 18.3), p('Debjit Tripathy', 11, 11, 28.8)),
    m('2025', 'intl', p('Anuradha Santhanam', 16, 14, 41.1), p('Saransh Mohapatra', 21, 13, 54.0), p('Madhavi Das', 0, 0, 1.0), p('Sushant', 17, 14, 43.7)),
    m('2026', 'intl', p('Glenn Tuazon', 21, 12, 52.0), p('Kiran kalyan', 15, 10, 37.1), p('Sameer Khan', 8, 9, 19.8), p('Roma Pandya', 8, 7, 19.8)),
    m('2027', 'intl', p('Abhinav Dasgupta', 16, 8, 50.0), p('Suhas', 14, 6, 43.7), p('Anuradha Dharwadkar', 10, 4, 31.2), p('Vignesh Ramanathan', 10, 6, 31.2)),
    m('2028', 'intl', p('Sujit Ray', 0, 0, 1.0), p('Diya', 14, 9, 34.1), p('Gandharvraj Gwalani', 9, 8, 21.9), p('Rohan Mitra', 16, 10, 39.0)),
    m('2029', 'intl', p('Sanveer Singh Puri', 8, 12, 18.0), p('Vidit Uppal', 7, 8, 15.7), p('Christy Varghese', 0, 0, 1.0), p('Nikhil Arora', 12, 11, 27.0)),
    m('2030', 'intl', p('An अनन्या Deb', 17, 14, 42.0), p('Samrat Sengupta', 14, 13, 34.5), p('Abhishek Paul', 0, 0, 0.0), p('Mayuresh Gadge', 11, 14, 27.1)),
    m('2031', 'intl', p('Alokita Basu', 17, 20, 30.0), p('Rohan Nagpal', 0, 0, 1.0), p('Aditya H Iyer', 0, 0, 1.0), p('Pratik Singh', 13, 19, 22.9)),
    m('2032', 'intl', p('Rohan naidu', 17, 10, 42.5), p('Priyank Mehta', 0, 0, 1.0), p('Sheethal', 18, 8, 45.0), p('Sandeep Hari', 10, 8, 25.0)),
    m('2033', 'intl', p('Pravin Varma', 14, 9, 44.4), p('Gautam Dambekodi', 11, 7, 34.9), p('Vishal Chandra', 12, 6, 38.1), p('Rishi Rajasekaran', 17, 10, 54.0)),
    m('2034', 'intl', p('Namita Jane itty', 17, 14, 37.8), p('Rohan Williams', 0, 0, 1.0), p('Jayanthi Srinivasan', 22, 16, 49.0), p('Anmol Singh', 10, 12, 22.2)),
    m('2035', 'intl', p('Ishan Kaul', 2, 6, 3.9), p('Sid Grover', 9, 8, 17.6), p('Wes Kington', 23, 18, 45.0), p('Gokulan Valavan', 11, 16, 21.5)),
    m('2036', 'intl', p('Manjula Jonnalagadda', 16, 12, 39.0), p('Parvati Abdulpurkar', 4, 2, 9.7), p('Paddy Narasimha Murthy', 7, 10, 17.0), p('Saahil Sharma', 12, 11, 29.2)),
    m('2037', 'intl', p('Sanjay Kadaveru', 6, 8, 13.5), p('Rohan Rodrigues', 15, 9, 33.7), p('kelsey barcomb', 20, 10, 45.0), p('Param Nagda', 4, 1, 9.0)),
    m('2038', 'intl', p('Sudarshan Aji', 14, 7, 43.7), p('Shyam Shreyas', 16, 8, 50.0), p('Rohan Walyat', 4, 4, 12.5), p('Armand Sanchez', 16, 8, 50.0)),

    // --- SMASHDOWN (GW2) ---
    // 3-team games, 48Q format. Each p() call is one TEAM, not one player -
    // use the team name (e.g. "2 peas") in place of a player name. Add real
    // results below with the same m()/p() helpers, e.g.:
    // m('S201', 'smashdown', p('2 peas', 14, 9, 41.0), p('Above Par', 18, 10, 48.0), p('Anuraja', 11, 8, 33.5)),
  ]
};