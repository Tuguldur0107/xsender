import express from "express";
import { PrismaClient } from "../prisma/client";
import { encrypt } from "../utils/encryption";

const router = express.Router();
const prisma = new PrismaClient();

// POST /api/user/register
router.post("/register", async (req, res) => {
  try {
    const {
      fbId,
      companyName,
      regNo,
      etaxUsername,
      etaxPassword,
      keyFileBase64,
      keyPassword,
    } = req.body;

    // Validation
    if (!fbId || !companyName || !regNo || !etaxUsername || !etaxPassword) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // AES шифрлэлт
    const encryptedEtaxPass = encrypt(etaxPassword);
    const encryptedKeyPass = encrypt(keyPassword || "");

    // User бүртгэх (exist check хийгээгүй, дараа нэмэх)
    const user = await prisma.user.upsert({
      where: { fbId },
      update: {},
      create: {
        fbId,
      },
    });

    // Company бүртгэх
    const company = await prisma.company.create({
      data: {
        userId: user.id,
        name: companyName,
        regNo,
        etaxUsername,
        encryptedPass: encryptedEtaxPass,
        keyFileBase64,
        keyPassword: encryptedKeyPass,
      },
    });

    res.json({ success: true, companyId: company.id });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
});

export default router;
