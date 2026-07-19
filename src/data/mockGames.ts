import type { Game } from '../types';

// Pulled from FLQL S9 - Draws and Scheduling. Reader emails intentionally
// excluded - real personal addresses shouldn't live in a frontend repo, even
// as mock data. "zoomNeeded" derives from a "Needed"/blank note in that column.
export const mockGames: Game[] = [
  { id: '6122', date: '15-Jun', time: '12:00 PM', seats: ['Archana', 'Alanckrit Jain', 'Anil Raghavan', 'Vibhu Prakash'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INDIA' },
  { id: '7123', date: '16-Jun', time: '10:00 PM', seats: ['Rithwik Rao Harekal', 'Archana', 'Santosh K', 'Namratha'], zoomNeeded: true, reader: 'Jatin Reddy', readerAssigned: true, track: 'INTL' },
  { id: '7126', date: '16-Jun', time: '10:00 PM', seats: ['Pranav Bontadkar', 'Dev', 'Dibyesh Hota', 'Srinivasan Rangarajan'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7008', date: '17-Jun', time: '7:00 PM', seats: ['Cheyenne Fletcher', 'Manoj Saranathan', 'Somasish Ghosh', 'Sujay'], zoomNeeded: false, reader: 'Shrotam', readerAssigned: true, track: 'INTL' },
  { id: '7030', date: '17-Jun', time: '8:30 PM', seats: ['Vasisht Vasudevan', 'Raunaq Vohra', 'Bharat Sridhar', 'Supratim Sengupta'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7102', date: '17-Jun', time: '10:30 PM', seats: ['Keshav Athreya', 'Subrat Mohanty', 'Aswath Venkataraman', 'Shashank T'], zoomNeeded: false, reader: 'Suvanssh M', readerAssigned: true, track: 'INTL' },
  { id: '7016', date: '17-Jun', time: '11:00 PM', seats: ['Mikey Brown', 'Anmol Singh', 'Shounak Purkayastha', 'Sushant'], zoomNeeded: false, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7045', date: '18-Jun', time: '8:00 PM', seats: ['Nikhil George', 'Gowtham Ravikumar', 'Jayakrishnan R (Jay)', 'EMPTY'], zoomNeeded: false, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7104', date: '18-Jun', time: '8:00 PM', seats: ['Navin Jayakumar', 'Utkarsh', 'Venkatesh Srinivasan', 'Anand Sivashankar'], zoomNeeded: true, reader: 'Jatin Reddy', readerAssigned: true, track: 'INTL' },
  { id: '7118', date: '18-Jun', time: '9:00 PM', seats: ['Abijeet Shyam', 'Debanjan Mahapatra', 'Sudhir Kamath', 'Kapinjal Kishore Sharma'], zoomNeeded: true, reader: 'Jatin Reddy', readerAssigned: true, track: 'INTL' },
  { id: '7020', date: '18-Jun', time: '10:00 PM', seats: ['Santosh V', 'Tanay Padhi', 'Devrim Aslan', 'Erwin Fortuin'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7039', date: '19-Jun', time: '10:30 AM', seats: ['A Reyna Shruti', 'Paddy Narasimha Murthy', 'Sukanya Lenhardt', 'Sundesh Shetty'], zoomNeeded: false, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7044', date: '19-Jun', time: '1:00 PM', seats: ['EMPTY', 'Alexandra Müller', 'Smitha Bhat', 'Sharon Thomas'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7011', date: '19-Jun', time: '4:00 PM', seats: ['Tom Keck', 'Tomasz Orzechowski', 'Venkatraghavan S.', 'Ajit Nayak'], zoomNeeded: true, reader: 'Ankit Bisht', readerAssigned: true, track: 'INTL' },
  { id: '7003', date: '19-Jun', time: '6:30 PM', seats: ['Seoan Webb', 'George Scratcherd', 'Richard McNair', 'Rohan Williams'], zoomNeeded: true, reader: 'Postponed/wrong entry', readerAssigned: false, track: 'INTL' },
];