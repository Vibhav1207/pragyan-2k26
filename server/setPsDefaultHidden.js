import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import { ProblemStatement, SystemSettings } from './models.js';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vibhavpateltechfest_db_user:TechfestPass2026@task1web.qqdtxkg.mongodb.net/pragyan?retryWrites=true&w=majority&appName=task1web';

async function setPsDefaultHidden() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Set all Problem Statements isVisible to false
    const res = await ProblemStatement.updateMany({}, { $set: { isVisible: false, updatedAt: new Date() } });
    console.log(`✅ Set all ${res.modifiedCount} problem statements to isVisible: false.`);

    // 2. Set master setting psGlobalVisible to false
    await SystemSettings.updateOne({}, { $set: { psGlobalVisible: false } }, { upsert: true });
    console.log('✅ SystemSettings psGlobalVisible set to false (locked/hidden by default).');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

setPsDefaultHidden();
