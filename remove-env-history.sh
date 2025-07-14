#!/bin/bash

echo "🔍 Checking if aws.key exists in Git history..."

# ตรวจสอบว่า aws.key เคยอยู่ในประวัติหรือไม่
if git log -- aws.key | grep commit > /dev/null; then
  echo "⚠️  Found aws.key in Git history!"
  
  # ถามก่อนลบ
  read -p "❓ Do you want to REMOVE aws.key from all git history? This will rewrite history. (y/n): " confirm
  if [[ "$confirm" == "y" ]]; then
    
    # เช็คว่าติดตั้ง git-filter-repo แล้วหรือยัง
    if ! command -v git-filter-repo &> /dev/null; then
      echo "❌ Error: git-filter-repo is not installed."
      echo "👉 Install on macOS: brew install git-filter-repo"
      echo "👉 Or see: https://github.com/newren/git-filter-repo"
      exit 1
    fi

    echo "🧹 Running: git filter-repo --path aws.key --invert-paths --force"
    git filter-repo --path aws.key --invert-paths --force

    echo "✅ aws.key has been removed from git history."

    echo ""
    echo "🚀 Next step: Force push to remote:"
    echo "    git push origin --force --all"
    echo ""
    echo "⚠️  Be sure to inform your team to re-clone the repo."
    
  else
    echo "❌ Aborted. aws.key still remains in git history."
  fi
else
  echo "✅ No aws.key found in Git history. You're clean!"
fi
