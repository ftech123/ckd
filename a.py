import csv
import random

# Define the range and category mappings
ranges_and_categories = [
    ((120, None), "Normal", "pale", "low", "low", "low", "low", "low"),
    ((130, 120), "Stage 1 Mild Kidney Damage", "colorless", "moderate", "moderate", "moderate", "moderate", "moderate"),
    ((140, 130), "Stage 2 Mild Kidney Damage", "colorless", "moderate", "moderate", "moderate", "moderate", "moderate"),
    ((150, 140), "Stage 3 Mild to Moderate Kidney Damage", "colorless", "moderate", "moderate", "moderate", "moderate", "moderate"),
    ((160, 150), "Stage 4 Severe Kidney Damage", "dark", "moderate", "moderate", "moderate", "moderate", "moderate"),
    ((180, 160), "Stage 5 Most Severe Kidney Damage", "brown", "high", "high", "high", "high", "high")
]

# Define the CSV file name
csv_file = "ckd_dataset_1000.csv"

# Define the headers for the CSV file
headers = ["Blood Pressure Category", "Urine Color", "Albumin", "Sugar", "Blood Glucose Random", "Blood Urea", "Sodium", "Food Recommendation", "Medicine Recommendation", "Exercise Recommendation", "Doctor Recommendation"]

# Open the CSV file in write mode
with open(csv_file, mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(headers)  # Write headers to the CSV file

    # Generate 1000 random values and write them to the CSV file
    for _ in range(1000):
        # Randomly select a range and corresponding categories
        r, bp_category, urine_color, al, su, bgr, bu, sod = random.choice(ranges_and_categories)

        # Write the row to the CSV file
        writer.writerow([bp_category, urine_color, al, su, bgr, bu, sod, "", "", "", ""])

print("CSV dataset with 1000 values created successfully!")
