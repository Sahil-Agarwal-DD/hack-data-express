text="""name|date|subscription snapshot day UTC
consumer_id|number|consumer unique identifier
subscription_id|number|subscription unique identifier
user_id|number|user unique identifier
consumer_subscription_plan_id|number|consumer_subscription_plan_id
region_id|number|region id
submarket_id|number|submarket_id
invoice_trial_conversion_date|date|invoice_trial_conversion_date
region_name|string|region_name
final_trial_conversion_date|date|final_trial_conversion_date
experience|string|experience
trial_convert_date|date|trial_convert_date
trial_cancel_date|date|trial_cancel_date
trial_start_date|date|trial_start_date
country_id|number|country_id
country|string|country
subscription_type|string|subscription_type
is_last_day_of_month|boolean|is_last_day_of_month
is_last_day_of_week|boolean|is_last_day_of_week
monthly_fee|numeric|monthly_fee
unit_start_time|date|unit_start_time
unit_end_time|date|unit_end_time
original_unit_end_time|date|original_unit_end_time
start_time|date|start_time
dynamic_subscription_status|string|dynamic_subscription_status
balance_category|string|balance_category
version|string|version - actual/forecast
trial_sign_ups|number|trial_sign_ups
ctp|number|ctp
dtp|number|dtp
new_sub|number|new_sub
paid_churn|number|paid_churn
trial_churn|number|trial_churn
trial_balance|number|trial_balance
trial_ctp|number|trial_ctp
good_standing_trial_balance|number|good_standing_trial_balance
paid_balance|number|paid_balance
total_balance|number|total_balance
good_standing_paid_balance|number|good_standing_paid_balance
free_balance|number|free_balance
annual_plan_balance|number|annual_plan_balance
monthly_plan_balance|number|monthly_plan_balance
student_plan_balance|number|student_plan_balance
paused|number|paused
paid_paused|number|paid paused
trial_paused|number|trial paused
pause_churned_subs|number|pause_churned_subs
unpause_subs|number|unpause_subs
pause_balance|number|pause balance
dtp_ohar_paused|number|dtp ohar paused
upgrade_paid_churn|number|upgrade paid churn
active_paid_churn|number|active paid churn
passive_paid_churn|number|passive paid churn
active_paid_pause|number|active paid pause
passive_paid_pause|number|passive paid pause
trial_cancel|number|trial cancel
ohar_cancel|number|ohar cancel
invoice_conversion|number|invoice conversion
ohar_conversion|number|ohar conversion
country_id_subscribed_from|number|country id subscribed from
country_name_subscribed_from|string|country_name_subscribed_from"""

template = """    - name: {name}
      type: {type}
      description: {description}"""

for line in text.split("\n"):
    col, type, description = line.split("|")
    print(template.format(name=col, type=type, description=description))
