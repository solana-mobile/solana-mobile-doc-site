#!/bin/bash

# List of authorized GitHub usernames
AUTHORIZED_USERS="michaelsulistio,ankur2136,emmett-solana,Funkatronics,J909,konoart,oliveeyay,sdlaver"

# Extract the GitHub username from the VERCEL_GIT_COMMIT_AUTHOR_LOGIN environment variable
COMMIT_AUTHOR=$VERCEL_GIT_COMMIT_AUTHOR_LOGIN

# Check if we're on the main branch (always build this)
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  echo "✅ - Build can proceed"
  exit 1;
fi

# If the build is from a PR
if [[ ! -z "$VERCEL_GIT_PULL_REQUEST_ID" ]] ; then
  # Check if the commit author is in the list of authorized users
  if [[ $AUTHORIZED_USERS == *"$COMMIT_AUTHOR"* ]] ; then
    echo "✅ - Build can proceed: PR from authorized user"
    exit 1;
  else
    echo "🛑 - Build cancelled: PR from unauthorized user"
    exit 0;
  fi
fi

echo "🛑 - Build cancelled"
exit 0