import React from "react";
import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { CHAT_CONFIG } from "./chat.config";
import styles from "./Chat.module.css";

interface ChatHumanSupportProps {
  onBackToChat?: () => void;
}

export const ChatHumanSupport: React.FC<ChatHumanSupportProps> = ({
  onBackToChat,
}) => {
  const { companyContact } = CHAT_CONFIG;

  return (
    <div className={styles.humanSupportCard} role="region" aria-label="Talk to Human Support">
      <div className={styles.humanSupportHeader}>
        <span className={styles.humanSupportBadge}>Verified Team</span>
        <h4 className={styles.humanSupportTitle}>Connect with Parthav Leadership</h4>
        <p className={styles.humanSupportSubtitle}>
          Direct lines to our strategy and engineering leads in Jaipur.
        </p>
      </div>

      <div className={styles.humanChannelsList}>
        {/* Email */}
        <a
          href={`mailto:${companyContact.email}`}
          className={styles.humanChannelRow}
        >
          <div className={`${styles.humanChannelIcon} ${styles.iconBgNavy}`}>
            <Mail size={16} />
          </div>
          <div className={styles.humanChannelInfo}>
            <span className={styles.humanChannelLabel}>Email Us</span>
            <span className={styles.humanChannelValue}>{companyContact.email}</span>
          </div>
          <ArrowUpRight size={15} className={styles.humanChannelArrow} />
        </a>

        {/* WhatsApp */}
        <a
          href={companyContact.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.humanChannelRow}
        >
          <div className={`${styles.humanChannelIcon} ${styles.iconBgOrange}`}>
            <MessageCircle size={16} />
          </div>
          <div className={styles.humanChannelInfo}>
            <span className={styles.humanChannelLabel}>WhatsApp Direct</span>
            <span className={styles.humanChannelValue}>Instant chat with our team</span>
          </div>
          <ArrowUpRight size={15} className={styles.humanChannelArrow} />
        </a>

        {/* Phone */}
        <a
          href={`tel:${companyContact.phone.replace(/\s+/g, "")}`}
          className={styles.humanChannelRow}
        >
          <div className={`${styles.humanChannelIcon} ${styles.iconBgBlue}`}>
            <Phone size={16} />
          </div>
          <div className={styles.humanChannelInfo}>
            <span className={styles.humanChannelLabel}>Direct Phone</span>
            <span className={styles.humanChannelValue}>{companyContact.phone}</span>
          </div>
          <ArrowUpRight size={15} className={styles.humanChannelArrow} />
        </a>
      </div>

      {/* Office & Hours */}
      <div className={styles.humanMetaDetails}>
        <div className={styles.humanMetaItem}>
          <MapPin size={13} className={styles.humanMetaIcon} />
          <span>{companyContact.location}</span>
        </div>
        <div className={styles.humanMetaItem}>
          <Clock size={13} className={styles.humanMetaIcon} />
          <span>{companyContact.workingHours}</span>
        </div>
      </div>

      <div className={styles.humanActionRow}>
        <Link href="/contact" className={styles.humanFullContactLink}>
          Open Full Contact Page →
        </Link>
        {onBackToChat && (
          <button
            type="button"
            className={styles.humanBackBtn}
            onClick={onBackToChat}
          >
            Back to Chat
          </button>
        )}
      </div>
    </div>
  );
};
