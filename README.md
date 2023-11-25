````
/**
 * odometerStart always starts with previous trip odometerEnd, no gap allowed
 */
class Trip {
  // date of trip
  date: Date;
  odometerStart: number;
  odometerEnd: number;
  type: 'work' | 'personal';
}

````
Input: user have to keep a record of vehicle trips for TaxOffice for 12 weeks as a proof of expenses.
12 weeks considered as enough to calculate an average vehicle usage for work goals. For example if user traveled 1000kms for 12 weeks, 800kms for work trips and 200kms for personal trips - workUsage would be 80% and personal usage would be 20%.
Based on this information user can claim tax deduction for all vehicle expenses (if user spent 1000$ for his vehicle, he can claim 80% or 800$ as a tax deduction).
Withing a full year (01.01 - 31.12) user can choose any 12 weeks records to provide to the TaxOffice
  
extra: 12 weeks period can't include time before the first ride and after the last ride
Goal: create algoritm to find the best 12 weeks (by workUsage%) to provide for TaxOffice
example: user traveled 1000kms from 01.01 until 01.03 with, 800kms for work and 200kms for personal, workUsage=80%
user traveled 500kms from 01.03 until 01.06 with, 450kms for work and 50kms for personal, workUsage=90%
based on this example algorithm should provide date 01.03 - 01.06 + list of trips inside this period (as the best 12 weeks logbook, based on the highest workUsage%)
