const dayjs = require('dayjs')
const {serve} = require('@upstash/workflow/express');
const Subscription = require('../models/subscription.model');
const REMINDERS = [7,5,2,1]
exports.sendReminder = serve(async(context)=>{
const {subscriptionId} = context.requestPayload;
const subscription = await fetchSubscription(context,subscriptionId);
if(!subscription || subscription.status!=='active'){
    return;
}
const renewalDate =  dayjs(subscription.renewalDate)
if(renewalDate.isBefore(dayjs())){
    console.log(`renewal date has passed for subscription ${subscriptionId}. Stopping workflow`)
    return;
}
for (const dayBefore of REMINDERS){
    const reminderDate = renewalDate.subtract(dayBefore,'day')
    if(reminderDate.isAfter(dayjs())){
        await sleepUntilReminder(context,`Reminder ${dayBefore} days before`,reminderDate)
    }
    await triggerReminder(context,`Reminder ${dayBefore} days before`)
}
})

const fetchSubscription = async(context,subscriptionId)=>{
    return await context.run('get subscription',async()=>{
        return Subscription.findById(subscriptionId).populate('user','name email')
    })
}
const sleepUntilReminder = async(context,label,date)=>{
    console.log(`Sleeping until ${label} reminder at ${date}`)
    context.sleepUntil(label,date.toDate())
}

const triggerReminder = async(context,label)=>{
    return await context.run(label,()=>{
        console.log(`triggering ${label} reminder`)
    })
}