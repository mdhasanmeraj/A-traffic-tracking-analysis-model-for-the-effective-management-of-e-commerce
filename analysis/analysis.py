from pymongo import MongoClient
import pandas as pd

# Connect to the MongoDB cluster
client = MongoClient("mongodb+srv://mdhasanmeraj8:Mdhasan123@myprojectcluster.ehcwr.mongodb.net/Myproject?retryWrites=true&w=majority&appName=MyProjectCluster")

# Access the database and the collection
db = client['Myproject']

holdings_collection = db['holdings']
holdings_data = holdings_collection.find({})
holdings_df = pd.DataFrame(list(holdings_data))
# Clean column names
holdings_df.columns = holdings_df.columns.str.strip()
# Calculate total value for each holding if columns exist
if 'qty' in holdings_df.columns and 'price' in holdings_df.columns:
    holdings_df['total_value'] = holdings_df['qty'] * holdings_df['price']
else:
    print("Columns 'qty' or 'price' not found in holdings_df.")
# Calculate average price if 'avg' column exists
if 'avg' in holdings_df.columns:
    average_price = holdings_df['avg'].mean()
    print(f"Average Price of Holdings: {average_price}")
else:
    print("Column 'avg' not found in holdings_df.")

    # Display results
print(holdings_df[['name', 'qty', 'price', 'total_value']])

### 2. Analyzing Orders

#For the `OrdersSchema`, we want to analyze the total quantity ordered and the total revenue generated.


# Access the orders collection
orders_collection = db['orders']
orders_data = orders_collection.find({})
orders_df = pd.DataFrame(list(orders_data))
 # Clean column names
orders_df.columns = orders_df.columns.str.strip()
 # Calculate total quantity ordered and total revenue
if 'qty' in orders_df.columns and 'price' in orders_df.columns:
     total_qty = orders_df['qty'].sum()
     total_revenue = (orders_df['qty'] * orders_df['price']).sum()
     # Display results
     print(orders_df[['name', 'qty', 'price']])
     print(f"Total Quantity Ordered: {total_qty}")
     print(f"Total Revenue: {total_revenue}")
else:
     print("Columns 'qty' or 'price' not found in orders_df.")
    
### 3. Analyzing Positions

#For the `PositionsSchema`, you can analyze the number of positions in profit or loss.


# Access the positions collection
positions_collection = db['positions']

# Fetch data from the collection
positions_data = positions_collection.find({})
positions_df = pd.DataFrame(list(positions_data))

# Count positions in profit and loss
profit_count = positions_df[positions_df['isLoss'] == False].count()['name']
loss_count = positions_df[positions_df['isLoss'] == True].count()['name']

# Display results
print(positions_df[['product', 'name', 'qty', 'avg', 'price', 'isLoss']])
print(f"Total Positions in Profit: {profit_count}")
print(f"Total Positions in Loss: {loss_count}")

### 4. Analyzing Users
user_collection = db['users']

    # Fetch data from the collection
user_data = user_collection.find({})
user_df = pd.DataFrame(list(user_data))
# Analyze age distribution
age_distribution = user_df['age'].describe()
# Count users by country
country_count = user_df['country'].value_counts()
# Display results
print(user_df[['email', 'age', 'country']])
print(f"Age Distribution:\n{age_distribution}")
print(f"Users by Country:\n{country_count}")
